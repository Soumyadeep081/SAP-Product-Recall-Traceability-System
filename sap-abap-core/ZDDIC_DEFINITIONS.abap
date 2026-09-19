*======================================================================*
* Project: SAP S/4HANA AI Procurement & PO Management System
* Phase 2 & 3: Data Dictionary (DDIC) Definitions
* Descriptions: Custom Transparent Tables, Data Elements & Domains
*======================================================================*

"----------------------------------------------------------------------"
" 1. DOMAINS (Technical Data Types)
"----------------------------------------------------------------------"
" Domain: ZD_PO_ID (Purchase Order ID: 10 Digits Numeric)
" Domain: ZD_VENDOR_ID (Vendor ID: 10 Chars Alpha-Numeric)
" Domain: ZD_MATERIAL_ID (Material Number: 18 Chars)
" Domain: ZD_DELAY_DAYS (Delay in Days: Integer)
" Domain: ZD_SCORE (Performance Score: 3 Decimals Percentage)

"----------------------------------------------------------------------"
" 2. DATA ELEMENTS (Semantic Meaning & Labels)
"----------------------------------------------------------------------"
" Data Element: ZPO_ID          -> Type: ZD_PO_ID         Text: "Purchase Order ID"
" Data Element: ZVENDOR_ID      -> Type: ZD_VENDOR_ID     Text: "Vendor Number"
" Data Element: ZMATERIAL_ID    -> Type: ZD_MATERIAL_ID   Text: "Material Number"
" Data Element: ZEXPECTED_DATE  -> Type: DATS             Text: "Expected Delivery Date"
" Data Element: ZACTUAL_DATE    -> Type: DATS             Text: "Actual Delivery Date"
" Data Element: ZDELAY_DAYS     -> Type: INT4             Text: "Delivery Delay (Days)"
" Data Element: ZPERF_SCORE     -> Type: DEC 5,2          Text: "Vendor Performance Score (%)"

"----------------------------------------------------------------------"
" 3. TRANSPARENT TABLE: ZPO_HEADER (PO Header Details)
"----------------------------------------------------------------------"
@EndUserText.label : 'Purchase Order Header Table'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
DEFINE TABLE zpo_header {
  key client    : abap.clnt NOT NULL;
  key po_id     : zpo_id NOT NULL;
  vendor_id     : zvendor_id NOT NULL;
  po_date       : abap.dats;
  expected_date : abap.dats;
  status        : abap.char(15);   " PENDING, DELIVERED, DELAYED, CANCELLED
  total_amount  : abap.curr(15,2);
  currency      : abap.cuky;
  created_by    : abap.char(12);
  created_at    : abap.tims;
}

"----------------------------------------------------------------------"
" 4. TRANSPARENT TABLE: ZPO_ITEM (PO Line Items)
"----------------------------------------------------------------------"
@EndUserText.label : 'Purchase Order Line Item Table'
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
DEFINE TABLE zpo_item {
  key client  : abap.clnt NOT NULL;
  key po_id   : zpo_id NOT NULL;
  key item_id : abap.numc(4) NOT NULL;
  material_id : zmaterial_id NOT NULL;
  mat_desc    : abap.char(40);
  quantity    : abap.quan(13,3);
  unit        : abap.unit(3);
  unit_price  : abap.curr(11,2);
  net_amount  : abap.curr(13,2);
}

"----------------------------------------------------------------------"
" 5. TRANSPARENT TABLE: ZGOODS_RECEIPT (Goods Receipt Log)
"----------------------------------------------------------------------"
@EndUserText.label : 'Goods Receipt Log Table'
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
DEFINE TABLE zgoods_receipt {
  key client   : abap.clnt NOT NULL;
  key gr_id    : abap.char(10) NOT NULL;
  po_id        : zpo_id NOT NULL;
  gr_date      : abap.dats NOT NULL;
  received_qty : abap.quan(13,3);
  received_by  : abap.char(12);
  remarks      : abap.char(100);
}

"----------------------------------------------------------------------"
" 6. TRANSPARENT TABLE: ZVENDOR_SCORE (Vendor Analytics Summary)
"----------------------------------------------------------------------"
@EndUserText.label : 'Vendor Performance and Risk Scorecard'
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
DEFINE TABLE zvendor_score {
  key client        : abap.clnt NOT NULL;
  key vendor_id     : zvendor_id NOT NULL;
  vendor_name       : abap.char(40);
  total_po          : abap.int4;
  delayed_po        : abap.int4;
  avg_delay_days    : abap.dec(5,2);
  ontime_delivery_pct: abap.dec(5,2);
  performance_score : abap.dec(5,2);
  risk_level        : abap.char(10);  " LOW, MODERATE, HIGH
  last_evaluated    : abap.dats;
}
