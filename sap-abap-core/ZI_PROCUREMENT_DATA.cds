@AbapCatalog.sqlViewName: 'ZIPROCUREMENT'
@AbapCatalog.compiler.compareFilter: true
@AbapCatalog.preserveKey: true
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Core Interface CDS View for Procurement Data'
define view ZI_PROCUREMENT_DATA
  as select from zpo_header as Header
  left outer join zgoods_receipt as Receipt on Header.po_id = Receipt.po_id
  left outer join zvendor_score  as Vendor  on Header.vendor_id = Vendor.vendor_id
{
  key Header.po_id         as PurchaseOrder,
      Header.vendor_id     as VendorID,
      Vendor.vendor_name   as VendorName,
      Header.po_date       as PurchaseOrderDate,
      Header.expected_date as ExpectedDeliveryDate,
      Receipt.gr_date      as ActualDeliveryDate,
      Header.status        as POStatus,
      Header.total_amount  as TotalAmount,
      Header.currency      as Currency,
      
      /* Calculated Field: Delivery Delay in Days */
      case 
        when Receipt.gr_date > Header.expected_date 
        then dats_days_between(Header.expected_date, Receipt.gr_date)
        else 0
      end                  as DelayDays,
      
      /* Risk Evaluation */
      case
        when Receipt.gr_date > Header.expected_date 
             and dats_days_between(Header.expected_date, Receipt.gr_date) > 5
        then 'HIGH_RISK'
        when Receipt.gr_date > Header.expected_date
        then 'MODERATE'
        else 'LOW'
      end                  as RiskCategory
}
