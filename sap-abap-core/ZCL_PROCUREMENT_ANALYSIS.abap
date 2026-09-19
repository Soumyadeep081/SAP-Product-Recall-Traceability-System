*======================================================================*
* Project: SAP S/4HANA AI Procurement & PO Management System
* Phase 5 & 6: ABAP OO Class for Procurement Business Logic
* Class: ZCL_PROCUREMENT_ANALYSIS
*======================================================================*

CLASS zcl_procurement_analysis DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    TYPES: BEGIN OF ty_po_analysis,
             po_id         TYPE zpo_id,
             vendor_id     TYPE zvendor_id,
             vendor_name   TYPE char40,
             po_date       TYPE dats,
             expected_date TYPE dats,
             actual_date   TYPE dats,
             delay_days    TYPE i,
             status        TYPE char15,
             total_amount  TYPE p LENGTH 8 DECIMALS 2,
             currency      TYPE cuky,
             risk_category TYPE char10,
           END OF ty_po_analysis.

    TYPES: tt_po_analysis TYPE TABLE OF ty_po_analysis.

    TYPES: BEGIN OF ty_vendor_eval,
             vendor_id      TYPE zvendor_id,
             vendor_name    TYPE char40,
             total_orders   TYPE i,
             delayed_orders TYPE i,
             ontime_pct     TYPE p LENGTH 5 DECIMALS 2,
             avg_delay      TYPE p LENGTH 5 DECIMALS 2,
             score          TYPE p LENGTH 5 DECIMALS 2,
             risk_level     TYPE char10,
           END OF ty_vendor_eval.

    METHODS:
      get_po_data
        IMPORTING iv_po_id          TYPE zpo_id OPTIONAL
        RETURNING VALUE(rt_po_data) TYPE tt_po_analysis,

      calculate_delay
        IMPORTING iv_expected         TYPE dats
                  iv_actual           TYPE dats
        RETURNING VALUE(rv_delay_days) TYPE i,

      calculate_vendor_score
        IMPORTING iv_vendor_id       TYPE zvendor_id
        RETURNING VALUE(rs_eval)     TYPE ty_vendor_eval,

      get_risk_level
        IMPORTING iv_delay_days      TYPE i
                  iv_ontime_pct      TYPE p
        RETURNING VALUE(rv_risk)     TYPE char10.

  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_procurement_analysis IMPLEMENTATION.

  METHOD get_po_data.
    " Using Modern Open SQL with Table Joins & Expressions
    SELECT h~po_id,
           h~vendor_id,
           s~vendor_name,
           h~po_date,
           h~expected_date,
           g~gr_date AS actual_date,
           h~status,
           h~total_amount,
           h~currency
      FROM zpo_header AS h
      LEFT OUTER JOIN zgoods_receipt AS g ON h~po_id = g~po_id
      LEFT OUTER JOIN zvendor_score AS s  ON h~vendor_id = s~vendor_id
      WHERE ( iv_po_id IS INITIAL OR h~po_id = @iv_po_id )
      INTO TABLE @DATA(lt_raw_po).

    " Process records in internal table
    LOOP AT lt_raw_po ASSIGNING FIELD-SYMBOL(<fs_po>).
      DATA(ls_analysis) = VALUE ty_po_analysis(
        po_id         = <fs_po>-po_id
        vendor_id     = <fs_po>-vendor_id
        vendor_name   = <fs_po>-vendor_name
        po_date       = <fs_po>-po_date
        expected_date = <fs_po>-expected_date
        actual_date   = <fs_po>-actual_date
        status        = <fs_po>-status
        total_amount  = <fs_po>-total_amount
        currency      = <fs_po>-currency
      ).

      " Calculate Delay Days
      IF <fs_po>-actual_date IS NOT INITIAL.
        ls_analysis-delay_days = calculate_delay(
          iv_expected = <fs_po>-expected_date
          iv_actual   = <fs_po>-actual_date
        ).
      ELSE.
        " If not received yet, compare with current system date
        ls_analysis-delay_days = calculate_delay(
          iv_expected = <fs_po>-expected_date
          iv_actual   = sy-datum
        ).
      ENDIF.

      " Determine Risk Category for PO
      IF ls_analysis-delay_days <= 0.
        ls_analysis-risk_category = 'ON_TIME'.
      ELSEIF ls_analysis-delay_days <= 3.
        ls_analysis-risk_category = 'MINOR_DELAY'.
      ELSE.
        ls_analysis-risk_category = 'HIGH_RISK'.
      ENDIF.

      APPEND ls_analysis TO rt_po_data.
    ENDLOOP.
  ENDMETHOD.

  METHOD calculate_delay.
    " ABAP Date Arithmetic: Actual - Expected
    IF iv_actual > iv_expected.
      rv_delay_days = iv_actual - iv_expected.
    ELSE.
      rv_delay_days = 0.
    ENDIF.
  ENDMETHOD.

  METHOD calculate_vendor_score.
    " Read PO history for Vendor
    SELECT COUNT( * ) AS total,
           SUM( CASE WHEN g~gr_date > h~expected_date THEN 1 ELSE 0 END ) AS delayed
      FROM zpo_header AS h
      LEFT OUTER JOIN zgoods_receipt AS g ON h~po_id = g~po_id
      WHERE h~vendor_id = @iv_vendor_id
      INTO (@rs_eval-total_orders, @rs_eval-delayed_orders).

    rs_eval-vendor_id = iv_vendor_id.
    IF rs_eval-total_orders > 0.
      DATA(lv_ontime) = rs_eval-total_orders - rs_eval-delayed_orders.
      rs_eval-ontime_pct = ( lv_ontime * 100 ) / rs_eval-total_orders.

      " Calculate overall performance score (Weighted Formula)
      rs_eval-score = rs_eval-ontime_pct.

      " Categorize Risk
      rs_eval-risk_level = get_risk_level(
        iv_delay_days = 0
        iv_ontime_pct = rs_eval-ontime_pct
      ).
    ELSE.
      rs_eval-ontime_pct = 100.
      rs_eval-score      = 100.
      rs_eval-risk_level = 'LOW'.
    ENDIF.
  ENDMETHOD.

  METHOD get_risk_level.
    IF iv_ontime_pct >= 90.
      rv_risk = 'LOW'.
    ELSEIF iv_ontime_pct >= 75.
      rv_risk = 'MODERATE'.
    ELSE.
      rv_risk = 'HIGH'.
    ENDIF.
  ENDMETHOD.

ENDCLASS.
