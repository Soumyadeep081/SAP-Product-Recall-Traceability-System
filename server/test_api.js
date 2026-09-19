const http = require('http');

const data = JSON.stringify({
  query: "Why was PO 45000103 delayed?"
});

const req = http.request({
  hostname: 'localhost',
  port: 4000,
  path: '/api/ai/ask',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    console.log("RAG Response:\n", JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.on('error', error => {
  console.error("API Request Error:", error);
});

req.write(data);
req.end();
