/**
 * SAP S/4HANA AI Procurement & PO Management System
 * Standalone Frontend Application Logic with Enhanced Purchase Order Details
 */

const STANDALONE_SAP_DATA = {
  vendors: [
    { vendor_id: "V001", name: "Apex Industrial Supplies Ltd.", category: "Raw Materials", contact: "sales@apexind.com", phone: "+1-555-0192" },
    { vendor_id: "V002", name: "Precision Tech Components", category: "Electronics", contact: "orders@precisiontech.com", phone: "+1-555-0144" },
    { vendor_id: "V003", name: "Global Logistics & Steel Corp", category: "Metals & Alloys", contact: "support@globallogistics.com", phone: "+1-555-0188" },
    { vendor_id: "V004", name: "Titan Packaging Systems", category: "Packaging", contact: "info@titanpack.com", phone: "+1-555-0123" },
    { vendor_id: "V005", name: "Nexus Polymer & Chemical", category: "Chemicals", contact: "supply@nexuschem.com", phone: "+1-555-0177" },
    { vendor_id: "V006", name: "Vortex Machinery Parts", category: "Equipment Parts", contact: "vortex@machineryparts.com", phone: "+1-555-0155" },
    { vendor_id: "V007", name: "Starlight Electricals", category: "Electricals", contact: "b2b@starlightelec.com", phone: "+1-555-0111" }
  ],
  pos: [
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
      items: [{ item_id: "0010", material_id: "MAT01", description: "High-Grade Stainless Steel Sheet (2mm)", quantity: 100, unit_price: 145.00, net_amount: 14500.00 }],
      gr_records: [{ gr_id: "50000801", gr_date: "2026-08-11", received_qty: 100, received_by: "M_SMITH", remarks: "1 day delay due to customs clearance." }]
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
      items: [{ item_id: "0010", material_id: "MAT02", description: "Industrial Microcontroller Unit (MCU-V4)", quantity: 500, unit_price: 32.50, net_amount: 16250.00 }],
      gr_records: [{ gr_id: "50000802", gr_date: "2026-08-12", received_qty: 500, received_by: "J_DOE", remarks: "On-time delivery. All items passed QA." }]
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
      items: [{ item_id: "0010", material_id: "MAT03", description: "Heavy Duty Hydraulic Cylinder 500mm", quantity: 50, unit_price: 680.00, net_amount: 34000.00 }],
      gr_records: [{ gr_id: "50000803", gr_date: "2026-08-22", received_qty: 50, received_by: "R_WILSON", remarks: "Severe 7-day delay. Port congestion in Rotterdam." }]
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
      items: [{ item_id: "0010", material_id: "MAT01", description: "High-Grade Stainless Steel Sheet (2mm)", quantity: 200, unit_price: 145.00, net_amount: 29000.00 }],
      gr_records: [{ gr_id: "50000804", gr_date: "2026-08-28", received_qty: 200, received_by: "R_WILSON", remarks: "Vendor raw material shortage. Delayed by 8 days." }]
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
      items: [{ item_id: "0010", material_id: "MAT04", description: "Reinforced Corrugated Shipping Boxes", quantity: 2000, unit_price: 4.20, net_amount: 8400.00 }],
      gr_records: [{ gr_id: "50000805", gr_date: "2026-08-18", received_qty: 2000, received_by: "A_GARCIA", remarks: "Delivered on schedule." }]
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
      items: [{ item_id: "0010", material_id: "MAT05", description: "Industrial Solvent Polyethylene (200L)", quantity: 50, unit_price: 310.00, net_amount: 15500.00 }],
      gr_records: [{ gr_id: "50000806", gr_date: "2026-08-26", received_qty: 50, received_by: "M_SMITH", remarks: "Hazardous cargo transport delay (4 days)." }]
    },
    {
      po_id: "45000107",
      vendor_id: "V006",
      vendor_name: "Vortex Machinery Parts",
      po_date: "2026-08-15",
      expected_date: "2026-08-25",
      actual_date: null,
      delay_days: 16,
      status: "OVERDUE",
      total_amount: 42500.00,
      currency: "USD",
      items: [{ item_id: "0010", material_id: "MAT03", description: "Heavy Duty Hydraulic Cylinder 500mm", quantity: 60, unit_price: 680.00, net_amount: 40800.00 }],
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
      items: [{ item_id: "0010", material_id: "MAT06", description: "High Voltage Electrical Relay 24V", quantity: 500, unit_price: 18.75, net_amount: 9375.00 }],
      gr_records: [{ gr_id: "50000808", gr_date: "2026-08-28", received_qty: 500, received_by: "K_PATEL", remarks: "Perfect delivery." }]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAiDrawer();
  fetchDashboardSummary();
  fetchPurchaseOrders();
  fetchVendorScorecards();
  initCodeViewer();
});

// TAB NAVIGATION
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`view-${targetTab}`).classList.add('active');
    });
  });
}

// DASHBOARD KPIS
async function fetchDashboardSummary() {
  try {
    const res = await fetch('/api/sap/summary');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();

    document.getElementById('kpi-total-pos').textContent = data.total_pos;
    document.getElementById('kpi-delayed-pos').textContent = data.delayed_pos;
    document.getElementById('kpi-ontime-rate').textContent = data.ontime_rate;
    document.getElementById('kpi-high-risk').textContent = data.high_risk_vendors;
  } catch (err) {
    const pos = STANDALONE_SAP_DATA.pos;
    const total_pos = pos.length;
    const delayed_pos = pos.filter(p => p.delay_days > 2).length;
    const ontime_pos = total_pos - delayed_pos;
    const ontime_rate = ((ontime_pos / total_pos) * 100).toFixed(1);
    
    document.getElementById('kpi-total-pos').textContent = total_pos;
    document.getElementById('kpi-delayed-pos').textContent = delayed_pos;
    document.getElementById('kpi-ontime-rate').textContent = `${ontime_rate}%`;
    document.getElementById('kpi-high-risk').textContent = 2;
  }
}

// PURCHASE ORDERS TABLE
let allPurchaseOrders = [];

async function fetchPurchaseOrders() {
  try {
    const res = await fetch('/api/sap/pos');
    if (!res.ok) throw new Error('API unavailable');
    allPurchaseOrders = await res.json();
  } catch (err) {
    allPurchaseOrders = [...STANDALONE_SAP_DATA.pos];
  }

  renderPoTable(allPurchaseOrders);

  document.getElementById('statusFilter').addEventListener('change', filterPos);
  document.getElementById('searchInput').addEventListener('input', filterPos);
}

function renderPoTable(pos) {
  const tbody = document.getElementById('poTableBody');
  tbody.innerHTML = '';
  document.getElementById('po-count').textContent = `Showing ${pos.length} records`;

  pos.forEach(po => {
    const tr = document.createElement('tr');
    let statusClass = 'success-badge';
    if (po.delay_days > 5) statusClass = 'danger-badge';
    else if (po.delay_days > 0) statusClass = 'warning-badge';

    tr.innerHTML = `
      <td><strong>${po.po_id}</strong></td>
      <td>${po.vendor_name} <br><small class="text-secondary">${po.vendor_id}</small></td>
      <td>${po.po_date}</td>
      <td>${po.expected_date}</td>
      <td>${po.actual_date || '<span class="badge warning-badge">Pending</span>'}</td>
      <td><strong>${po.delay_days} Days</strong></td>
      <td>$${po.total_amount.toLocaleString()} ${po.currency}</td>
      <td><span class="badge ${statusClass}">${po.status}</span></td>
      <td>
        <button class="btn btn-secondary" onclick="viewPoDetail('${po.po_id}')">Details</button>
        <button class="btn btn-primary" onclick="askAiAboutPo('${po.po_id}')">AI RAG</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterPos() {
  const status = document.getElementById('statusFilter').value;
  const query = document.getElementById('searchInput').value.toLowerCase();

  let filtered = [...allPurchaseOrders];

  if (status === 'DELAYED') {
    filtered = filtered.filter(p => p.delay_days > 2);
  } else if (status === 'ON_TIME') {
    filtered = filtered.filter(p => p.delay_days <= 2);
  }

  if (query) {
    filtered = filtered.filter(p =>
      p.po_id.toLowerCase().includes(query) ||
      p.vendor_name.toLowerCase().includes(query) ||
      p.vendor_id.toLowerCase().includes(query)
    );
  }

  renderPoTable(filtered);
}

// ENHANCED PURCHASE ORDER DETAIL MODAL
function viewPoDetail(poId) {
  const po = allPurchaseOrders.find(p => p.po_id === poId);
  if (!po) return;

  document.getElementById('modalPoTitle').textContent = `SAP Purchase Order - ${po.po_id}`;
  
  let itemsHtml = (po.items || []).map(item => `
    <tr>
      <td><strong>${item.item_id}</strong></td>
      <td>${item.description} <br><small style="color: var(--sap-text-secondary); font-family: var(--font-mono);">${item.material_id}</small></td>
      <td>${item.quantity} ${item.unit || 'PC'}</td>
      <td>$${item.unit_price.toFixed(2)}</td>
      <td><strong>$${item.net_amount.toFixed(2)}</strong></td>
    </tr>
  `).join('');

  let grHtml = (po.gr_records || []).map(gr => `
    <div style="background: #f8fafc; border: 1px solid var(--sap-border); padding: 12px; border-radius: 6px; margin-top: 8px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong>GR ID: ${gr.gr_id}</strong>
        <span style="color: var(--sap-text-secondary); font-size: 12px;">Posting Date: ${gr.gr_date}</span>
      </div>
      <div style="font-size: 12px;">Received Qty: ${gr.received_qty} | Received By: <code>${gr.received_by}</code></div>
      <div style="font-size: 12px; color: #475569; margin-top: 4px; font-style: italic;">"${gr.remarks}"</div>
    </div>
  `).join('');

  let statusBadgeClass = 'success-badge';
  if (po.delay_days > 5) statusBadgeClass = 'danger-badge';
  else if (po.delay_days > 0) statusBadgeClass = 'warning-badge';

  let policyAlertHtml = '';
  if (po.delay_days > 5) {
    policyAlertHtml = `
      <div style="background: var(--color-danger-bg); border: 1px solid #fecaca; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #991b1b;">
        <strong>⚠️ Enterprise Policy Alert (Delivery SLA Exceeded):</strong><br>
        This Purchase Order experienced a <strong>${po.delay_days}-day delivery delay</strong>. Pursuant to Section 3 of Delivery Policy, penalty deduction of 1.5%/week applies.
        <br>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn btn-primary" onclick="closeModal(); askAiAboutPo('${po.po_id}');">Ask AI Assistant for Penalty Calculation</button>
          <button class="btn btn-secondary" onclick="exportPoPenaltyReport('${po.po_id}');">📄 Download Penalty PDF Report</button>
        </div>
      </div>
    `;
  }

  document.getElementById('modalPoContent').innerHTML = `
    ${policyAlertHtml}
    
    <!-- HEADER SUMMARY CARD -->
    <div style="background: var(--sap-blue-light); border: 1px solid #bfdbfe; padding: 16px; border-radius: 8px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; font-size: 13px;">
      <div>
        <span style="color: var(--sap-text-secondary); font-size: 11px;">VENDOR NAME</span><br>
        <strong>${po.vendor_name}</strong> (${po.vendor_id})
      </div>
      <div>
        <span style="color: var(--sap-text-secondary); font-size: 11px;">NET ORDER VALUE</span><br>
        <strong style="font-size: 15px; color: var(--sap-navy);">$${po.total_amount.toLocaleString()} ${po.currency}</strong>
      </div>
      <div>
        <span style="color: var(--sap-text-secondary); font-size: 11px;">STATUS / DELAY</span><br>
        <span class="badge ${statusBadgeClass}">${po.status}</span> <strong>(${po.delay_days} Days Delay)</strong>
      </div>
      <div>
        <span style="color: var(--sap-text-secondary); font-size: 11px;">PO DATE</span><br>
        ${po.po_date}
      </div>
      <div>
        <span style="color: var(--sap-text-secondary); font-size: 11px;">EXPECTED DELIVERY</span><br>
        ${po.expected_date}
      </div>
      <div>
        <span style="color: var(--sap-text-secondary); font-size: 11px;">ACTUAL GR DATE</span><br>
        ${po.actual_date || '<span style="color: var(--color-warning);">Pending Warehouse Posting</span>'}
      </div>
    </div>

    <!-- LINE ITEMS -->
    <h4 style="margin-bottom: 10px; font-size: 14px; color: var(--sap-navy);">Line Items (Table ZPO_ITEM)</h4>
    <table class="sap-table" style="margin-bottom: 20px;">
      <thead>
        <tr><th>Item</th><th>Material Description</th><th>Quantity</th><th>Unit Price</th><th>Net Amount</th></tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <!-- GOODS RECEIPTS -->
    <h4 style="margin-bottom: 10px; font-size: 14px; color: var(--sap-navy);">Goods Receipts Log (Table ZGOODS_RECEIPT)</h4>
    ${grHtml || '<div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-size: 12px; color: var(--sap-text-secondary);">No Goods Receipts posted yet for this Purchase Order.</div>'}
  `;

  document.getElementById('poModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('poModal').style.display = 'none';
}

// VENDOR SCORECARDS
async function fetchVendorScorecards() {
  let vendors = [];
  try {
    const res = await fetch('/api/sap/vendors');
    if (!res.ok) throw new Error('API unavailable');
    vendors = await res.json();
  } catch (err) {
    vendors = STANDALONE_SAP_DATA.vendors.map(v => {
      const pos = STANDALONE_SAP_DATA.pos.filter(p => p.vendor_id === v.vendor_id);
      const total_po = pos.length;
      const delayed_po = pos.filter(p => p.delay_days > 2).length;
      const ontime_pct = total_po > 0 ? (((total_po - delayed_po) / total_po) * 100).toFixed(1) : 100.0;
      
      let risk_level = "LOW";
      if (ontime_pct < 75 || delayed_po >= 2) risk_level = "HIGH";
      else if (ontime_pct < 90 || delayed_po === 1) risk_level = "MODERATE";

      return {
        vendor_id: v.vendor_id,
        vendor_name: v.name,
        category: v.category,
        total_po,
        delayed_po,
        ontime_pct: parseFloat(ontime_pct),
        avg_delay_days: (pos.reduce((a, b) => a + b.delay_days, 0) / (total_po || 1)).toFixed(1),
        performance_score: parseFloat(ontime_pct),
        risk_level
      };
    });
  }

  const grid = document.getElementById('vendorGrid');
  grid.innerHTML = '';

  vendors.forEach(v => {
    let riskBadge = 'success-badge';
    if (v.risk_level === 'HIGH') riskBadge = 'danger-badge';
    else if (v.risk_level === 'MODERATE') riskBadge = 'warning-badge';

    const card = document.createElement('div');
    card.className = 'vendor-card';
    card.innerHTML = `
      <div class="vendor-card-header">
        <div>
          <div class="vendor-title">${v.vendor_name}</div>
          <div class="vendor-id-tag">${v.vendor_id} | ${v.category}</div>
        </div>
        <span class="badge ${riskBadge}">${v.risk_level} RISK</span>
      </div>
      <div class="vendor-metrics">
        <div class="metric-item">
          <span class="metric-label">On-Time Delivery Rate</span>
          <span class="metric-val" style="color: ${v.ontime_pct < 75 ? 'var(--color-danger)' : 'var(--color-success)'}">${v.ontime_pct}%</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">Total Orders / Delayed</span>
          <span class="metric-val">${v.total_po} / ${v.delayed_po}</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">Avg Delay (Days)</span>
          <span class="metric-val">${v.avg_delay_days} Days</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">Performance Score</span>
          <span class="metric-val">${v.performance_score}/100</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// AI ASSISTANT DRAWER
function initAiDrawer() {
  const drawer = document.getElementById('aiDrawer');
  const toggleBtn = document.getElementById('toggleAiDrawer');
  const closeBtn = document.getElementById('closeAiDrawer');
  const form = document.getElementById('chatForm');

  toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const query = input.value.trim();
    if (!query) return;

    appendUserMessage(query);
    input.value = '';
    submitAiQuery(query);
  });
}

function sendPresetQuery(query) {
  document.getElementById('aiDrawer').classList.add('open');
  appendUserMessage(query);
  submitAiQuery(query);
}

function toggleAiDrawerFromFab() {
  const drawer = document.getElementById('aiDrawer');
  drawer.classList.toggle('open');
}

function askAiAboutPo(poId) {
  sendPresetQuery(`Why was PO ${poId} delayed?`);
}

function appendUserMessage(text) {
  const log = document.getElementById('chatLog');
  const msg = document.createElement('div');
  msg.className = 'chat-msg user';
  msg.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

async function submitAiQuery(query) {
  const log = document.getElementById('chatLog');
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'chat-msg bot';
  loadingMsg.id = 'tempLoading';
  loadingMsg.innerHTML = `<div class="msg-bubble">⚡ <em>Querying SAP S/4HANA Database & RAG Vector Knowledge Base...</em></div>`;
  log.appendChild(loadingMsg);
  log.scrollTop = log.scrollHeight;

  let data = null;
  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error('API unavailable');
    data = await res.json();
  } catch (err) {
    data = executeClientSideRAG(query);
  }

  document.getElementById('tempLoading').remove();

  const botMsg = document.createElement('div');
  botMsg.className = 'chat-msg bot';

  let evidenceHtml = '';
  if (data.evidence && data.evidence.length > 0) {
    const items = data.evidence.map(e => `
      <div class="evidence-item">
        <strong>${e.key}:</strong> ${e.value}
      </div>
    `).join('');

    evidenceHtml = `
      <div class="grounded-evidence-box">
        <div class="evidence-header">📊 SAP S/4HANA Grounded Evidence:</div>
        <div class="evidence-grid">${items}</div>
      </div>
    `;
  }

  let sourcesHtml = '';
  if (data.sources && data.sources.length > 0) {
    const citations = data.sources.map(s => `
      <div class="citation-source">
        📄 <strong>${s.document_name}</strong> (${s.section})
        <br><small>"${s.snippet}"</small>
      </div>
    `).join('');

    sourcesHtml = `
      <div style="margin-top: 10px;">
        <strong style="font-size: 11px; color: var(--sap-text-secondary);">RAG Knowledge Sources:</strong>
        ${citations}
      </div>
    `;
  }

  botMsg.innerHTML = `
    <div class="msg-bubble">
      ${data.answer}
      ${evidenceHtml}
      ${sourcesHtml}
    </div>
  `;

  log.appendChild(botMsg);
  log.scrollTop = log.scrollHeight;
}

function executeClientSideRAG(query) {
  const poMatch = query.match(/45000\d{3}/);
  const targetPO = poMatch ? STANDALONE_SAP_DATA.pos.find(p => p.po_id === poMatch[0]) : null;
  const vendorMatch = query.match(/V00\d/i);
  const targetVendor = vendorMatch ? STANDALONE_SAP_DATA.vendors.find(v => v.vendor_id === vendorMatch[0].toUpperCase()) : null;

  let answerText = "";
  let evidence = [];
  let sources = [];

  if (targetPO) {
    answerText = `PO ${targetPO.po_id} (Vendor: ${targetPO.vendor_name}) was delayed by ${targetPO.delay_days} days. ` +
                 `Expected delivery date was ${targetPO.expected_date}, but actual receipt was recorded on ${targetPO.actual_date || 'N/A'}. ` +
                 `According to Enterprise Delivery Policy Section 3, delays exceeding 5 days trigger automatic non-compliance logging and a 1.5%/week invoice penalty.`;

    evidence = [
      { key: "PO Number", value: targetPO.po_id },
      { key: "Vendor", value: `${targetPO.vendor_name} (${targetPO.vendor_id})` },
      { key: "PO Amount", value: `$${targetPO.total_amount.toLocaleString()} ${targetPO.currency}` },
      { key: "Expected Date", value: targetPO.expected_date },
      { key: "Actual GR Date", value: targetPO.actual_date || "Pending" },
      { key: "Delay Duration", value: `${targetPO.delay_days} Days (${targetPO.status})` }
    ];

    sources = [
      { document_name: "Delivery Policy", file: "delivery_policy.md", section: "Section 3: Vendor Penalties & Compensation", snippet: "Penalty of 1.5% per delayed week deducted from final invoice payment." },
      { document_name: "PO Approval Policy", file: "po_approval_policy.md", section: "Section 2: Delayed Delivery Waiver Approval", snippet: "Extensions exceeding 3 days require supplier compensation or VP approval." }
    ];
  } else if (targetVendor) {
    answerText = `Vendor ${targetVendor.name} (${targetVendor.vendor_id}) is currently categorized under Procurement Risk evaluation. ` +
                 `According to Vendor Management SOP Section 3, vendors with delayed orders or low on-time rates require a mandatory Corrective Action Plan (CAP) within 7 business days.`;

    evidence = [
      { key: "Vendor ID", value: targetVendor.vendor_id },
      { key: "Vendor Name", value: targetVendor.name },
      { key: "Category", value: targetVendor.category },
      { key: "Contact", value: targetVendor.contact }
    ];

    sources = [
      { document_name: "Vendor Management SOP", file: "vendor_management_sop.md", section: "Section 3: Risk Level Definitions", snippet: "HIGH RISK: Restricted vendor status. Corrective Action Plan mandatory within 7 days." }
    ];
  } else {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('help')) {
      answerText = `Hello! I am your <strong>SAP S/4HANA AI Procurement Assistant</strong>. I am linked directly to your SAP database and enterprise SOP policy documents.<br><br>You can ask me questions like:<br>• <em>"Why was PO 45000103 delayed?"</em><br>• <em>"Which vendors are tagged as HIGH RISK?"</em><br>• <em>"What penalties apply to vendor V003?"</em>`;
      sources = [
        { document_name: "Delivery Policy", file: "delivery_policy.md", section: "Section 2: Delay Calculation & Grace Period", snippet: "Delay Days = Actual Delivery Date - Expected Delivery Date." }
      ];
    } else if (lowerQuery.includes('delayed') || lowerQuery.includes('delay')) {
      const delayedPOs = STANDALONE_SAP_DATA.pos.filter(p => p.delay_days > 2);
      answerText = `There are currently <strong>${delayedPOs.length} Purchase Orders</strong> with significant delivery delays in SAP S/4HANA: ${delayedPOs.map(p => `PO ${p.po_id} (${p.delay_days} days late)`).join(', ')}.<br><br>Ask about any specific PO ID to view full grounded SAP evidence and SLA penalty rules.`;
      evidence = delayedPOs.map(p => ({ key: `PO ${p.po_id}`, value: `${p.vendor_name} (${p.delay_days} days late)` }));
      sources = [
        { document_name: "Delivery Policy", file: "delivery_policy.md", section: "Section 3: Vendor Penalties & Compensation", snippet: "Delays exceeding 5 days incur a 1.5%/week penalty deduction." }
      ];
    } else {
      answerText = `Based on SAP Procurement Policies & SOPs: All Purchase Orders require 3-way matching between PO, Goods Receipt, and Invoice Receipt. Delivery delays exceeding 5 days trigger exception reviews.`;
      sources = [
        { document_name: "Delivery Policy", file: "delivery_policy.md", section: "Section 2: Delay Calculation & Grace Period", snippet: "Delay Days = Actual Delivery Date - Expected Delivery Date." }
      ];
    }
  }

  return { query, answer: answerText, evidence, sources };
}

// CODE VIEWER
const ABAP_FILES = {
  ddic: `DEFINE TABLE zpo_header {\n  key client : abap.clnt NOT NULL;\n  key po_id : zpo_id NOT NULL;\n  vendor_id : zvendor_id NOT NULL;\n  po_date : abap.dats;\n  expected_date : abap.dats;\n  status : abap.char(15);\n  total_amount : abap.curr(15,2);\n}`,
  oo: `CLASS zcl_procurement_analysis DEFINITION PUBLIC FINAL CREATE PUBLIC.\n  PUBLIC SECTION.\n    METHODS:\n      get_po_data RETURNING VALUE(rt_po) TYPE tt_po_analysis,\n      calculate_delay IMPORTING iv_expected TYPE dats iv_actual TYPE dats RETURNING VALUE(rv_days) TYPE i.\nENDCLASS.`,
  cds1: `define view ZI_PROCUREMENT_DATA as select from zpo_header as Header left outer join zgoods_receipt as Receipt on Header.po_id = Receipt.po_id {\n  key Header.po_id as PurchaseOrder,\n  Header.vendor_id as VendorID,\n  dats_days_between(Header.expected_date, Receipt.gr_date) as DelayDays\n}`,
  cds2: `define view ZC_PROCUREMENT_ANALYTICS as select from ZI_PROCUREMENT_DATA {\n  @UI.lineItem: [{ position: 10, label: 'PO Number' }]\n  key PurchaseOrder,\n  @UI.lineItem: [{ position: 60, label: 'Delay (Days)' }]\n  DelayDays\n}`,
  rap: `define service ZUI_PROCUREMENT_ANALYTICS {\n  expose ZC_PROCUREMENT_ANALYTICS as ProcurementAnalytics;\n}`
};

function initCodeViewer() {
  const codeBtns = document.querySelectorAll('.code-tab-btn');
  const codeViewer = document.getElementById('codeViewer');

  codeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      codeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const codeKey = btn.getAttribute('data-code');
      codeViewer.textContent = ABAP_FILES[codeKey] || 'Source file content...';
    });
  });
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// FORMAL SAP SLA PENALTY PDF REPORT GENERATOR
function exportPoPenaltyReport(poId) {
  const po = allPurchaseOrders.find(p => p.po_id === poId) || STANDALONE_SAP_DATA.pos.find(p => p.po_id === poId);
  if (!po) {
    alert("Purchase Order not found for export.");
    return;
  }

  const penaltyRate = 1.5; // 1.5% per week
  const penaltyAmount = ((po.total_amount * penaltyRate) / 100).toFixed(2);
  const netPayable = (po.total_amount - parseFloat(penaltyAmount)).toFixed(2);
  const scoreDeduction = po.delay_days > 5 ? 15 : 5;

  const printWin = window.open('', '_blank', 'width=900,height=800');
  if (!printWin) {
    alert("Please allow popups to generate the Penalty PDF Report.");
    return;
  }

  const reportHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>SAP S/4HANA SLA Audit & Penalty Report - PO ${po.po_id}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; padding: 40px; margin: 0; background: #fff; }
        .header { display: flex; justify-content: space-between; border-bottom: 3px solid #0a6ed1; padding-bottom: 16px; margin-bottom: 24px; }
        .sap-logo { font-size: 24px; font-weight: 800; color: #0a6ed1; }
        .sap-logo span { color: #354a5f; font-size: 14px; font-weight: 600; }
        .report-title { text-align: right; }
        .report-title h2 { margin: 0; font-size: 18px; color: #1d2d3e; }
        .report-title p { margin: 4px 0 0 0; font-size: 12px; color: #64748b; }
        
        .badge-danger { background: #ffebeb; color: #bb0000; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-block; }
        
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 13px; }
        .grid-item label { color: #64748b; font-size: 11px; font-weight: 600; display: block; text-transform: uppercase; }
        .grid-item strong { font-size: 14px; color: #0f172a; }
        
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
        th { background: #eef5fc; color: #1d2d3e; text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; }
        td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
        
        .policy-box { background: #fffbe6; border: 1px solid #ffe58f; border-left: 4px solid #d46b08; padding: 16px; border-radius: 6px; margin-bottom: 24px; font-size: 12px; color: #873800; }
        .policy-box h4 { margin: 0 0 6px 0; font-size: 13px; }
        
        .penalty-summary { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; margin-bottom: 30px; }
        .penalty-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
        .penalty-row.total { border-top: 2px dashed #94a3b8; font-weight: 700; font-size: 15px; margin-top: 8px; padding-top: 10px; color: #0f172a; }
        
        .footer { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
        .signature-line { border-top: 1px solid #64748b; width: 180px; margin-top: 40px; text-align: center; font-size: 11px; color: #475569; }
        
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="background: #0a6ed1; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">🖨️ Print / Save as PDF</button>
      </div>

      <div class="header">
        <div class="sap-logo">
          SAP S/4HANA<br>
          <span>Procurement Intelligence Engine</span>
        </div>
        <div class="report-title">
          <h2>FORMAL SLA PENALTY & AUDIT REPORT</h2>
          <p>Document ID: SLA-AUDIT-${po.po_id}-${Date.now().toString().slice(-4)}</p>
          <p>Generated Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        </div>
      </div>

      <div class="grid">
        <div class="grid-item"><label>Purchase Order ID</label><strong>${po.po_id}</strong></div>
        <div class="grid-item"><label>Vendor Name</label><strong>${po.vendor_name} (${po.vendor_id})</strong></div>
        <div class="grid-item"><label>Audit Status</label><span class="badge-danger">NON-COMPLIANT (${po.delay_days} DAYS DELAY)</span></div>
        <div class="grid-item"><label>PO Creation Date</label><strong>${po.po_date}</strong></div>
        <div class="grid-item"><label>Expected Delivery Date</label><strong>${po.expected_date}</strong></div>
        <div class="grid-item"><label>Actual Warehouse Posting Date</label><strong>${po.actual_date || 'N/A'}</strong></div>
      </div>

      <h3>1. Line Item Breakdown (SAP Table ZPO_ITEM)</h3>
      <table>
        <thead>
          <tr><th>Item</th><th>Material Number</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>Net Value</th></tr>
        </thead>
        <tbody>
          ${(po.items || []).map(item => `
            <tr>
              <td>${item.item_id}</td>
              <td><code>${item.material_id}</code></td>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>$${item.unit_price.toFixed(2)}</td>
              <td>$${item.net_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h3>2. Corporate Procurement Policy Grounding Citation</h3>
      <div class="policy-box">
        <h4>📜 Referenced SOP Document: delivery_policy.md (Section 3: Vendor Penalties & Compensation)</h4>
        <p><em>"For delays exceeding 5 business days without prior written force-majeure approval, a penalty of 1.5% per delayed week is automatically deducted from final invoice payment, alongside a 15-point quarterly Vendor Performance Score reduction."</em></p>
      </div>

      <h3>3. Financial Deduction & Invoice Settlement Matrix</h3>
      <div class="penalty-summary">
        <div class="penalty-row"><span>Original Gross Purchase Order Amount:</span><span>$${po.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${po.currency}</span></div>
        <div class="penalty-row" style="color: #bb0000;"><span>SLA Non-Compliance Penalty Deduction (1.5% Rate):</span><span>- $${penaltyAmount} ${po.currency}</span></div>
        <div class="penalty-row" style="color: #d97706;"><span>Vendor Performance Score Deduction:</span><span>- ${scoreDeduction} Points</span></div>
        <div class="penalty-row total"><span>Adjusted Net Payable Amount (MIRO Invoice Limit):</span><span>$${netPayable} ${po.currency}</span></div>
      </div>

      <div style="display: flex; justify-content: space-between;">
        <div class="signature-line">
          Prepared by:<br>
          <strong>SAP Procurement Lead</strong>
        </div>
        <div class="signature-line">
          Approved by:<br>
          <strong>VP Supply Chain / CPO</strong>
        </div>
      </div>

      <div class="footer">
        <span>Confidential - Internal SAP S/4HANA Audit Document</span>
        <span>Generated via SAP AI Procurement Engine (RAP + RAG)</span>
      </div>
    </body>
    </html>
  `;

  printWin.document.write(reportHtml);
  printWin.document.close();
}

