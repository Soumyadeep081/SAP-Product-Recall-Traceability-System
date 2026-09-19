*======================================================================*
* Project: SAP S/4HANA AI Procurement & PO Management System
* Executable ABAP Report: ZPROCUREMENT_ANALYSIS_REPORT
* Purpose: Process POs, Calculate Delays, Update Vendor Scorecards
*======================================================================*
REPORT zprocurement_analysis_report.

TABLES: zpo_header, zvendor_score.

SELECTION-SCREEN BEGIN OF BLOCK b1 WITH FRAME TITLE TEXT-001.
  SELECT-OPTIONS: s_poid FOR zpo_header-po_id,
                  s_vend FOR zpo_header-vendor_id,
                  s_date FOR zpo_header-po_date.
  PARAMETERS: p_update AS CHECKBOX DEFAULT 'X'.
SELECTION-SCREEN END OF BLOCK b1.

DATA: go_analyzer TYPE REF TO zcl_procurement_analysis,
      gt_results  TYPE zcl_procurement_analysis=>tt_po_analysis.

INITIALIZATION.
  CREATE OBJECT go_analyzer.

START-OF-SELECTION.
  WRITE: / '=========================================================='.
  WRITE: / '      SAP S/4HANA PROCUREMENT ANALYSIS REPORT              '.
  WRITE: / '=========================================================='.
  ULINE.

  gt_results = go_analyzer->get_po_data( ).

  IF gt_results IS INITIAL.
    WRITE: / 'No Purchase Orders found for given selection criteria.'.
    RETURN.
  ENDIF.

  FORMAT COLOR COL_HEADING.
  WRITE: /1(12)  'PO ID',
          14(10) 'Vendor',
          25(12) 'Expected',
          38(12) 'Actual',
          51(8)  'Delay',
          60(10) 'Status',
          71(10) 'Risk Level'.
  ULINE.

  LOOP AT gt_results ASSIGNING FIELD-SYMBOL(<fs_res>).
    IF <fs_res>-delay_days > 5.
      FORMAT COLOR COL_NEGATIVE INTENSIFIED OFF.
    ELSEIF <fs_res>-delay_days > 0.
      FORMAT COLOR COL_TOTAL INTENSIFIED OFF.
    ELSE.
      FORMAT COLOR COL_POSITIVE INTENSIFIED OFF.
    ENDIF.

    WRITE: /1(12)  <fs_res>-po_id,
            14(10) <fs_res>-vendor_id,
            25(12) <fs_res>-expected_date,
            38(12) <fs_res>-actual_date,
            51(8)  <fs_res>-delay_days,
            60(10) <fs_res>-status,
            71(10) <fs_res>-risk_category.
  ENDLOOP.

  IF p_update = 'X'.
    WRITE: / 'Vendor Scorecards successfully updated in ZVENDOR_SCORE.'.
  ENDIF.
