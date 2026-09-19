@AbapCatalog.sqlViewName: 'ZCPROCUREMENT'
@AbapCatalog.compiler.compareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Consumption View for Procurement Analytics App'
@Metadata.allowExtensions: true
@Search.searchable: true

define view ZC_PROCUREMENT_ANALYTICS
  as select from ZI_PROCUREMENT_DATA
{
  @UI.facet: [
    { id: 'HeaderFacet', type: #HEADER_REFERENCE, targetElement: '_Vendor' },
    { id: 'LineItems', type: #LINEITEM_REFERENCE, position: 10 }
  ]

  @UI.lineItem: [{ position: 10, importance: #HIGH, label: 'PO Number' }]
  @Search.defaultSearchElement: true
  key PurchaseOrder,

  @UI.lineItem: [{ position: 20, importance: #HIGH, label: 'Vendor' }]
  @UI.selectionField: [{ position: 10 }]
  VendorID,

  @UI.lineItem: [{ position: 30, importance: #MEDIUM, label: 'Vendor Name' }]
  VendorName,

  @UI.lineItem: [{ position: 40, label: 'Expected Date' }]
  ExpectedDeliveryDate,

  @UI.lineItem: [{ position: 50, label: 'Actual Date' }]
  ActualDeliveryDate,

  @UI.lineItem: [{ position: 60, criticality: 'DelayDays', label: 'Delay (Days)' }]
  DelayDays,

  @UI.lineItem: [{ position: 70, importance: #HIGH, label: 'Status' }]
  POStatus,

  @UI.lineItem: [{ position: 80, label: 'Total Amount' }]
  TotalAmount,

  Currency,

  @UI.lineItem: [{ position: 90, label: 'Risk Category' }]
  RiskCategory
}
