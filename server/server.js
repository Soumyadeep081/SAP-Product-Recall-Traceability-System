const express = require('express');
const cors = require('cors');
const path = require('path');
const { PURCHASE_ORDERS, VENDORS, MATERIALS, getVendorScorecards } = require('./data');
const ragEngine = require('./rag_engine');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'client')));

// ---------------------------------------------------------------------
// SAP ODATA MOCK API ENDPOINTS
// ---------------------------------------------------------------------

// 1. Dashboard KPI Summary
app.get('/api/sap/summary', (req, res) => {
  const total_pos = PURCHASE_ORDERS.length;
  const delayed_pos = PURCHASE_ORDERS.filter(p => p.delay_days > 2).length;
  const ontime_pos = total_pos - delayed_pos;
  const scorecards = getVendorScorecards();
  const high_risk_vendors = scorecards.filter(v => v.risk_level === 'HIGH').length;
  const total_value = PURCHASE_ORDERS.reduce((acc, p) => acc + p.total_amount, 0);

  res.json({
    total_pos,
    delayed_pos,
    ontime_pos,
    high_risk_vendors,
    total_value: `$${(total_value / 1000).toFixed(1)}k USD`,
    ontime_rate: `${((ontime_pos / total_pos) * 100).toFixed(1)}%`
  });
});

// 2. PO List with Filtering & Search
app.get('/api/sap/pos', (req, res) => {
  const { status, vendor, search } = req.query;
  let results = [...PURCHASE_ORDERS];

  if (status && status !== 'ALL') {
    if (status === 'DELAYED') {
      results = results.filter(p => p.delay_days > 2);
    } else if (status === 'ON_TIME') {
      results = results.filter(p => p.delay_days <= 2);
    }
  }

  if (vendor) {
    results = results.filter(p => p.vendor_id === vendor);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => 
      p.po_id.toLowerCase().includes(q) ||
      p.vendor_name.toLowerCase().includes(q) ||
      p.vendor_id.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// 3. Single PO Details
app.get('/api/sap/pos/:id', (req, res) => {
  const po = PURCHASE_ORDERS.find(p => p.po_id === req.params.id);
  if (!po) {
    return res.status(404).json({ error: "Purchase Order not found" });
  }
  res.json(po);
});

// 4. Vendor Performance Scorecards
app.get('/api/sap/vendors', (req, res) => {
  const scorecards = getVendorScorecards();
  res.json(scorecards);
});

// ---------------------------------------------------------------------
// AI RAG GROUNDED INTELLIGENCE API ENDPOINT
// ---------------------------------------------------------------------
app.post('/api/ai/ask', (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: "Query prompt is required." });
  }

  console.log(`[AI RAG API] Received Query: "${query}"`);
  const response = ragEngine.analyzeQuery(query);
  res.json(response);
});

// Fallback to client SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SAP S/4HANA AI Procurement Server Running on Port ${PORT}`);
  console.log(`  OData API: http://localhost:${PORT}/api/sap/summary`);
  console.log(`  Fiori UI:  http://localhost:${PORT}/`);
  console.log(`=======================================================`);
});
