# SAP Enterprise Procurement Policy: Vendor Delivery & SLA Guidelines

## Section 1: Standard Delivery Timelines
- All Purchase Orders (POs) issued to vendors contain a binding Expected Delivery Date (`EXPECTED_DATE`).
- Vendors must acknowledge receipt of the PO within 24 business hours.
- Delivery is officially recorded upon creation of a Goods Receipt (`ZGOODS_RECEIPT` transaction `MIGO`) in SAP S/4HANA.

## Section 2: Delay Calculation & Grace Period
- **Delay Days Formula**: `Delay Days = Actual Delivery Date (GR_DATE) - Expected Delivery Date (EXPECTED_DATE)`.
- **Grace Period**: A 2-day delivery buffer is permitted for international logistics. Deliveries within <= 2 days are categorized as `ON_TIME / ACCEPTABLE`.
- **Moderate Delay (3 to 5 Days)**: Requires automated notification to procurement buyer. A mandatory performance review flag is attached to the vendor profile.
- **Critical Delay (> 5 Days)**: Triggers an automatic Procurement Team Exception Review. A formal Notice of Non-Compliance (NNC) is issued.

## Section 3: Vendor Penalties & Compensation
- For delays exceeding 5 business days without prior written force-majeure approval:
  - Penalty of **1.5% per delayed week** deducted from final invoice payment.
  - Automatic deduction of **15 points** from the vendor's quarterly `PERFORMANCE_SCORE`.
- If delay exceeds 14 days, the procurement manager holds authority to unilaterally terminate PO and re-allocate quantity to a secondary vendor.

## Section 4: Procurement Action Escalation Matrix
- **0 - 2 Days Delay**: No action required. Automatic GR posting.
- **3 - 5 Days Delay**: Vendor Account Manager contact required. Expedited shipping requested.
- **6+ Days Delay**: Flagged in RAG Assistant as `HIGH_RISK`. Requires Procurement Director review before issuing future Purchase Requisitions.
