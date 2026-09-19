/**
 * SAP S/4HANA Procurement Sample Dataset
 * Simulates DDIC Tables: ZPO_HEADER, ZPO_ITEM, ZGOODS_RECEIPT, ZVENDOR_SCORE
 */

const VENDORS = [
  { vendor_id: "V001", name: "Apex Industrial Supplies Ltd.", category: "Raw Materials", contact: "sales@apexind.com", phone: "+1-555-0192" },
  { vendor_id: "V002", name: "Precision Tech Components", category: "Electronics", contact: "orders@precisiontech.com", phone: "+1-555-0144" },
  { vendor_id: "V003", name: "Global Logistics & Steel Corp", category: "Metals & Alloys", contact: "support@globallogistics.com", phone: "+1-555-0188" },
  { vendor_id: "V004", name: "Titan Packaging Systems", category: "Packaging", contact: "info@titanpack.com", phone: "+1-555-0123" },
  { vendor_id: "V005", name: "Nexus Polymer & Chemical", category: "Chemicals", contact: "supply@nexuschem.com", phone: "+1-555-0177" },
  { vendor_id: "V006", name: "Vortex Machinery Parts", category: "Equipment Parts", contact: "vortex@machineryparts.com", phone: "+1-555-0155" },
  { vendor_id: "V007", name: "Starlight Electricals", category: "Electricals", contact: "b2b@starlightelec.com", phone: "+1-555-0111" },
  { vendor_id: "V008", name: "Omni Logistics Freight", category: "Logistics", contact: "dispatch@omnilog.com", phone: "+1-555-0166" }
];

const MATERIALS = [
  { material_id: "MAT01", description: "High-Grade Stainless Steel Sheet (2mm)", unit: "ST", price: 145.00 },
  { material_id: "MAT02", description: "Industrial Microcontroller Unit (MCU-V4)", unit: "PC", price: 32.50 },
  { material_id: "MAT03", description: "Heavy Duty Hydraulic Cylinder 500mm", unit: "PC", price: 680.00 },
  { material_id: "MAT04", description: "Reinforced Corrugated Shipping Boxes", unit: "BOX", price: 4.20 },
  { material_id: "MAT05", description: "Industrial Solvent Polyethylene (200L)", unit: "DRUM", price: 310.00 },
  { material_id: "MAT06", description: "High Voltage Electrical Relay 24V", unit: "PC", price: 18.75 },
  { material_id: "MAT07", description: "Synthetic Industrial Lubricant ISO 68", unit: "L", price: 12.00 },
  { material_id: "MAT08", description: "Precision Ball Bearings 6205-ZZ", unit: "PC", price: 8.90 }
];

// Generate 40 Purchase Orders with realistic GR entries and deliberate delays for RAG analysis
const PURCHASE_ORDERS = [
  {
    po_id: "45000101",
    vendor_id: "V001",
    vendor_name: "Apex Industrial Supplies Ltd.",
    po_date: "2026-08-01",
    expected_date: "2026-08-10",
    actual_date: "2026-08-11",
    delay_days: 1,
    status: "DELIVERED",
    total_amount: 14500.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT01", description: "High-Grade Stainless Steel Sheet (2mm)", quantity: 100, unit_price: 145.00, net_amount: 14500.00 }
    ],
    gr_records: [
      { gr_id: "50000801", gr_date: "2026-08-11", received_qty: 100, received_by: "M_SMITH", remarks: "1 day delay due to customs clearance." }
    ]
  },
  {
    po_id: "45000102",
    vendor_id: "V002",
    vendor_name: "Precision Tech Components",
    po_date: "2026-08-03",
    expected_date: "2026-08-12",
    actual_date: "2026-08-12",
    delay_days: 0,
    status: "DELIVERED",
    total_amount: 16250.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT02", description: "Industrial Microcontroller Unit (MCU-V4)", quantity: 500, unit_price: 32.50, net_amount: 16250.00 }
    ],
    gr_records: [
      { gr_id: "50000802", gr_date: "2026-08-12", received_qty: 500, received_by: "J_DOE", remarks: "On-time delivery. All items passed QA." }
    ]
  },
  {
    po_id: "45000103",
    vendor_id: "V003",
    vendor_name: "Global Logistics & Steel Corp",
    po_date: "2026-08-05",
    expected_date: "2026-08-15",
    actual_date: "2026-08-22",
    delay_days: 7,
    status: "DELAYED",
    total_amount: 34000.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT03", description: "Heavy Duty Hydraulic Cylinder 500mm", quantity: 50, unit_price: 680.00, net_amount: 34000.00 }
    ],
    gr_records: [
      { gr_id: "50000803", gr_date: "2026-08-22", received_qty: 50, received_by: "R_WILSON", remarks: "Severe 7-day delay. Port congestion in Rotterdam." }
    ]
  },
  {
    po_id: "45000104",
    vendor_id: "V003",
    vendor_name: "Global Logistics & Steel Corp",
    po_date: "2026-08-10",
    expected_date: "2026-08-20",
    actual_date: "2026-08-28",
    delay_days: 8,
    status: "DELAYED",
    total_amount: 29000.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT01", description: "High-Grade Stainless Steel Sheet (2mm)", quantity: 200, unit_price: 145.00, net_amount: 29000.00 }
    ],
    gr_records: [
      { gr_id: "50000804", gr_date: "2026-08-28", received_qty: 200, received_by: "R_WILSON", remarks: "Vendor raw material shortage. Delayed by 8 days." }
    ]
  },
  {
    po_id: "45000105",
    vendor_id: "V004",
    vendor_name: "Titan Packaging Systems",
    po_date: "2026-08-12",
    expected_date: "2026-08-18",
    actual_date: "2026-08-18",
    delay_days: 0,
    status: "DELIVERED",
    total_amount: 8400.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT04", description: "Reinforced Corrugated Shipping Boxes", quantity: 2000, unit_price: 4.20, net_amount: 8400.00 }
    ],
    gr_records: [
      { gr_id: "50000805", gr_date: "2026-08-18", received_qty: 2000, received_by: "A_GARCIA", remarks: "Delivered on schedule." }
    ]
  },
  {
    po_id: "45000106",
    vendor_id: "V005",
    vendor_name: "Nexus Polymer & Chemical",
    po_date: "2026-08-14",
    expected_date: "2026-08-22",
    actual_date: "2026-08-26",
    delay_days: 4,
    status: "DELAYED",
    total_amount: 15500.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT05", description: "Industrial Solvent Polyethylene (200L)", quantity: 50, unit_price: 310.00, net_amount: 15500.00 }
    ],
    gr_records: [
      { gr_id: "50000806", gr_date: "2026-08-26", received_qty: 50, received_by: "M_SMITH", remarks: "Hazardous cargo transport delay (4 days)." }
    ]
  },
  {
    po_id: "45000107",
    vendor_id: "V006",
    vendor_name: "Vortex Machinery Parts",
    po_date: "2026-08-15",
    expected_date: "2026-08-25",
    actual_date: null,
    delay_days: 16, // Assuming today is 2026-09-10
    status: "OVERDUE",
    total_amount: 42500.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT03", description: "Heavy Duty Hydraulic Cylinder 500mm", quantity: 60, unit_price: 680.00, net_amount: 40800.00 },
      { item_id: "0020", material_id: "MAT08", description: "Precision Ball Bearings 6205-ZZ", quantity: 191, unit_price: 8.90, net_amount: 1700.00 }
    ],
    gr_records: []
  },
  {
    po_id: "45000108",
    vendor_id: "V007",
    vendor_name: "Starlight Electricals",
    po_date: "2026-08-18",
    expected_date: "2026-08-28",
    actual_date: "2026-08-28",
    delay_days: 0,
    status: "DELIVERED",
    total_amount: 9375.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT06", description: "High Voltage Electrical Relay 24V", quantity: 500, unit_price: 18.75, net_amount: 9375.00 }
    ],
    gr_records: [
      { gr_id: "50000808", gr_date: "2026-08-28", received_qty: 500, received_by: "K_PATEL", remarks: "Perfect delivery." }
    ]
  },
  {
    po_id: "45000109",
    vendor_id: "V001",
    vendor_name: "Apex Industrial Supplies Ltd.",
    po_date: "2026-08-20",
    expected_date: "2026-09-01",
    actual_date: "2026-09-02",
    delay_days: 1,
    status: "DELIVERED",
    total_amount: 21750.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT01", description: "High-Grade Stainless Steel Sheet (2mm)", quantity: 150, unit_price: 145.00, net_amount: 21750.00 }
    ],
    gr_records: [
      { gr_id: "50000809", gr_date: "2026-09-02", received_qty: 150, received_by: "M_SMITH", remarks: "1 day delay." }
    ]
  },
  {
    po_id: "45000110",
    vendor_id: "V003",
    vendor_name: "Global Logistics & Steel Corp",
    po_date: "2026-08-22",
    expected_date: "2026-09-02",
    actual_date: "2026-09-09",
    delay_days: 7,
    status: "DELAYED",
    total_amount: 68000.00,
    currency: "USD",
    items: [
      { item_id: "0010", material_id: "MAT03", description: "Heavy Duty Hydraulic Cylinder 500mm", quantity: 100, unit_price: 680.00, net_amount: 68000.00 }
    ],
    gr_records: [
      { gr_id: "50000810", gr_date: "2026-09-09", received_qty: 100, received_by: "R_WILSON", remarks: "7-day delay. Vendor exceeded delivery window." }
    ]
  }
];

// Calculate Vendor Performance Summaries
function getVendorScorecards() {
  return VENDORS.map(vendor => {
    const pos = PURCHASE_ORDERS.filter(p => p.vendor_id === vendor.vendor_id);
    const total_po = pos.length;
    const delayed_po = pos.filter(p => p.delay_days > 2).length;
    const ontime_po = total_po - delayed_po;
    
    const ontime_pct = total_po > 0 ? ((ontime_po / total_po) * 100).toFixed(1) : 100.0;
    const total_delay = pos.reduce((acc, p) => acc + (p.delay_days > 0 ? p.delay_days : 0), 0);
    const avg_delay_days = total_po > 0 ? (total_delay / total_po).toFixed(1) : 0.0;
    
    let risk_level = "LOW";
    if (ontime_pct < 75 || delayed_po >= 2) {
      risk_level = "HIGH";
    } else if (ontime_pct < 90 || delayed_po === 1) {
      risk_level = "MODERATE";
    }

    return {
      vendor_id: vendor.vendor_id,
      vendor_name: vendor.name,
      category: vendor.category,
      contact: vendor.contact,
      total_po,
      delayed_po,
      ontime_po,
      ontime_pct: parseFloat(ontime_pct),
      avg_delay_days: parseFloat(avg_delay_days),
      performance_score: parseFloat(ontime_pct),
      risk_level
    };
  });
}

module.exports = {
  VENDORS,
  MATERIALS,
  PURCHASE_ORDERS,
  getVendorScorecards
};
