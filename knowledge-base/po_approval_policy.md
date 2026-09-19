# SAP Enterprise Procurement Policy: Purchase Order Approval & Authorization Matrix

## Section 1: Purchase Order Approval Thresholds
- **Tier 1 ($0 - $10,000)**: Auto-approved by SAP RAP workflow upon Purchase Requisition conversion.
- **Tier 2 ($10,001 - $100,000)**: Requires Buyer & Procurement Lead approval in SAP Fiori My Inbox.
- **Tier 3 ($100,001+)**: Requires VP of Supply Chain & Chief Procurement Officer (CPO) approval.

## Section 2: Delayed Delivery Waiver Approval
- If a vendor requests a delivery date extension, the buyer must enter a Change Request in SAP S/4HANA (`ME22N`).
- Extensions up to 3 days can be approved by the Procurement Lead.
- Extensions exceeding 3 days require supplier compensation or VP approval.

## Section 3: 3-Way Matching Rules
- Goods Receipt (`ZGOODS_RECEIPT`) quantity must equal Purchase Order (`ZPO_ITEM`) quantity within a +/- 2% tolerance.
- Price variance between PO unit price and invoice price exceeding 1% places an automatic block on payment (`MIRO` payment block).
