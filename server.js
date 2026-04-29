const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/analyze', async (req, res) => {
  const transcript = req.body.transcript;

  const prompt = `
You are analyzing a supervisor transcript.

Follow rules:
- Distinguish score 6 (execution) vs 7 (problem identification)
- Detect systems building vs task execution
- Map to KPIs (quality, TAT, etc.)

Return ONLY valid JSON in this format:
{
  "score": { "value": number, "justification": "text" },
  "evidence": [{ "quote": "text", "signal": "positive/negative" }],
  "kpiMapping": [{ "kpi": "name", "evidence": "text" }],
  "gaps": [{ "dimension": "name", "detail": "text" }],
  "followUpQuestions": [{ "question": "text" }]
}

Transcript:
${transcript}
`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false
      })
    });

    const data = await response.json();

    let output;
    try {
      output = JSON.parse(data.response); // try parsing
    } catch {
      output = { error: "Invalid JSON from model", raw: data.response };
    }

    res.json(output);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));