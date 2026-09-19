# Standard Operating Procedure (SOP): Vendor Performance Scoring & Risk Evaluation

## Section 1: Evaluation Overview
Vendor performance is evaluated dynamically in SAP S/4HANA using data from `ZPO_HEADER`, `ZPO_ITEM`, `ZGOODS_RECEIPT`, and synthesized in `ZVENDOR_SCORE`.

## Section 2: Performance Score Calculation Formula
The total `PERFORMANCE_SCORE` (0 - 100%) is calculated as follows:
- **On-Time Delivery Rate (60% weight)**: `(Total On-Time POs / Total POs) * 60`
- **Quality Acceptance Rate (30% weight)**: Goods accepted without Quality Management (QM) rejection / Total Received * 30.
- **Invoice & Documentation Accuracy (10% weight)**: 3-way matching accuracy between PO, GR, and Invoice Receipt (MIRO).

## Section 3: Risk Level Definitions
- **LOW RISK (Score >= 85%)**: Preferred vendor status. Eligible for automated PO approval and annual contract renewals.
- **MODERATE RISK (70% <= Score < 85%)**: Standard vendor status. Requires approval from Senior Procurement Specialist for orders above $50,000.
- **HIGH RISK (Score < 70% or > 3 Delayed POs in last 30 days)**: Restricted vendor status. Requires Procurement Director sign-off. Supplier Audit mandatory before issuing new POs.

## Section 4: Corrective Action Plan (CAP)
- Vendors tagged with `HIGH_RISK` must submit a formal Corrective Action Plan within 7 business days detailing root causes for logistics delays.
