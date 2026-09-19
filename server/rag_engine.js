/**
 * SAP RAG Knowledge Engine & Grounded Intelligence Middleware
 * Indexing SOPs, Policy Documents, and SAP Business Data
 */

const fs = require('fs');
const path = require('path');
const { PURCHASE_ORDERS, VENDORS, getVendorScorecards } = require('./data');

const KNOWLEDGE_BASE_DIR = path.join(__dirname, '..', 'knowledge-base');

class RAGEngine {
  constructor() {
    this.chunks = [];
    this.initKnowledgeBase();
  }

  initKnowledgeBase() {
    try {
      if (!fs.existsSync(KNOWLEDGE_BASE_DIR)) return;
      const files = fs.readdirSync(KNOWLEDGE_BASE_DIR);
      
      files.forEach(file => {
        if (!file.endsWith('.md')) return;
        const filePath = path.join(KNOWLEDGE_BASE_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Split markdown by sections (## or #)
        const sections = content.split(/(?=\n##\s+|\n#\s+)/);
        sections.forEach((sec, idx) => {
          const trimmed = sec.trim();
          if (trimmed.length < 20) return;

          // Extract title/header line
          const titleMatch = trimmed.match(/^(?:#|##)\s+(.+)/);
          const sectionTitle = titleMatch ? titleMatch[1] : `Section ${idx + 1}`;

          this.chunks.push({
            file: file,
            document_name: this.formatDocName(file),
            section: sectionTitle,
            content: trimmed
          });
        });
      });
      console.log(`[RAG ENGINE] Loaded ${this.chunks.length} knowledge base chunks from policies & SOPs.`);
    } catch (err) {
      console.error('[RAG ENGINE] Error initializing knowledge base:', err);
    }
  }

  formatDocName(filename) {
    return filename
      .replace('.md', '')
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // Vector / Keyword Similarity Search
  searchKnowledgeBase(query, topK = 3) {
    const terms = query.toLowerCase().split(/\W+/).filter(t => t.length > 2);
    
    const scoredChunks = this.chunks.map(chunk => {
      let score = 0;
      const lowerContent = chunk.content.toLowerCase();
      
      terms.forEach(term => {
        if (lowerContent.includes(term)) {
          score += 1;
          // Higher score if term appears in section header
          if (chunk.section.toLowerCase().includes(term)) score += 2;
        }
      });

      return { chunk, score };
    });

    scoredChunks.sort((a, b) => b.score - a.score);
    return scoredChunks.slice(0, topK).filter(sc => sc.score > 0).map(sc => sc.chunk);
  }

  // Find SAP Data Evidence
  extractSAPContext(query) {
    // Check if prompt references a specific PO Number (e.g. 45000103)
    const poMatch = query.match(/45000\d{3}/);
    let targetPO = null;
    if (poMatch) {
      targetPO = PURCHASE_ORDERS.find(p => p.po_id === poMatch[0]);
    }

    // Check if prompt references a Vendor ID (e.g. V003)
    const vendorMatch = query.match(/V00\d/i);
    let targetVendor = null;
    if (vendorMatch) {
      const vId = vendorMatch[0].toUpperCase();
      const scorecards = getVendorScorecards();
      targetVendor = scorecards.find(v => v.vendor_id === vId);
    }

    return { targetPO, targetVendor };
  }

  // Perform Full Grounded RAG Analysis
  analyzeQuery(query) {
    const { targetPO, targetVendor } = this.extractSAPContext(query);
    const retrievedDocs = this.searchKnowledgeBase(query, 2);

    let answerText = "";
    let evidence = [];
    let sources = [];

    // Case 1: Specific PO query
    if (targetPO) {
      const delay = targetPO.delay_days;
      const vendorName = targetPO.vendor_name;

      if (delay > 0) {
        answerText = `PO ${targetPO.po_id} (Vendor: ${vendorName}) was delayed by ${delay} days. ` +
                     `The expected delivery date was ${targetPO.expected_date}, but goods were received on ${targetPO.actual_date || 'N/A'}. ` +
                     `According to corporate procurement policy, deliveries delayed by more than ${delay > 5 ? '5' : '2'} days require mandatory procurement-team review and non-compliance logging.`;
      } else {
        answerText = `PO ${targetPO.po_id} was delivered on time on ${targetPO.actual_date} (Expected: ${targetPO.expected_date}). ` +
                     `The delivery meets all quality and SLA guidelines with 0 days delay.`;
      }

      evidence = [
        { key: "PO Number", value: targetPO.po_id },
        { key: "Vendor", value: `${targetPO.vendor_name} (${targetPO.vendor_id})` },
        { key: "PO Amount", value: `$${targetPO.total_amount.toLocaleString()} ${targetPO.currency}` },
        { key: "Expected Date", value: targetPO.expected_date },
        { key: "Actual GR Date", value: targetPO.actual_date || "Not Received Yet" },
        { key: "Delay Duration", value: `${targetPO.delay_days} Days (${targetPO.status})` }
      ];
    }
    // Case 2: Vendor Risk / Performance Query
    else if (targetVendor) {
      answerText = `Vendor ${targetVendor.vendor_name} (${targetVendor.vendor_id}) has an overall performance score of ${targetVendor.performance_score}%. ` +
                   `Out of ${targetVendor.total_po} total purchase orders, ${targetVendor.delayed_po} were delayed with an average delay of ${targetVendor.avg_delay_days} days. ` +
                   `Risk Level is currently evaluated as [${targetVendor.risk_level}]. ` +
                   `${targetVendor.risk_level === 'HIGH' ? 'According to the Vendor Management SOP, a formal Corrective Action Plan (CAP) must be submitted within 7 days.' : 'The vendor is in good standing.'}`;

      evidence = [
        { key: "Vendor ID", value: targetVendor.vendor_id },
        { key: "Vendor Name", value: targetVendor.vendor_name },
        { key: "On-Time Rate", value: `${targetVendor.ontime_pct}%` },
        { key: "Total POs", value: targetVendor.total_po },
        { key: "Delayed POs", value: targetVendor.delayed_po },
        { key: "Risk Level", value: targetVendor.risk_level }
      ];
    }
    // Case 3: General Policy / Procurement Query
    else {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('help')) {
        answerText = `Hello! I am your **SAP S/4HANA AI Procurement Assistant**. I am linked directly to your SAP database and enterprise SOP policy documents.\n\nYou can ask me questions like:\n• *"Why was PO 45000103 delayed?"*\n• *"Which vendors are tagged as HIGH RISK?"*\n• *"What penalties apply to vendor V003?"*`;
        evidence = [];
        sources = [
          {
            document_name: "Delivery Policy",
            file: "delivery_policy.md",
            section: "Section 2: Delay Calculation & Grace Period",
            snippet: "Delay Days = Actual Delivery Date - Expected Delivery Date."
          }
        ];
      } else if (lowerQuery.includes('delayed') || lowerQuery.includes('delay')) {
        const delayedPOs = PURCHASE_ORDERS.filter(p => p.delay_days > 2);
        answerText = `There are currently **${delayedPOs.length} Purchase Orders** with significant delivery delays in SAP S/4HANA: ${delayedPOs.map(p => `PO ${p.po_id} (${p.delay_days} days late)`).join(', ')}.\n\nAsk about any specific PO ID to view full grounded SAP evidence and SLA penalty rules.`;
        evidence = delayedPOs.map(p => ({ key: `PO ${p.po_id}`, value: `${p.vendor_name} (${p.delay_days} days late)` }));
      } else if (retrievedDocs.length > 0) {
        answerText = `Based on the SAP Procurement Policy and SOP documentation:\n\n${retrievedDocs[0].content.substring(0, 350)}...`;
      } else {
        answerText = `I have analyzed your procurement query across the SAP database and policy documents. Please specify a PO Number (e.g. 45000103) or Vendor ID (e.g. V003) for detailed grounded evidence.`;
      }
    }

    // Format Sources
    if (retrievedDocs.length > 0) {
      sources = retrievedDocs.map(doc => ({
        document_name: doc.document_name,
        file: doc.file,
        section: doc.section,
        snippet: doc.content.substring(0, 180) + '...'
      }));
    } else {
      // Default policy source
      sources = [
        {
          document_name: "Delivery Policy",
          file: "delivery_policy.md",
          section: "Section 2: Delay Calculation & Grace Period",
          snippet: "Delay Days = Actual Delivery Date - Expected Delivery Date. Deliveries > 5 days trigger automatic Procurement Team Exception Review."
        }
      ];
    }

    return {
      query,
      answer: answerText,
      evidence,
      sources
    };
  }
}

module.exports = new RAGEngine();
