export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { text } = req.body;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are FocusFlow, a calm professional planner who helps organize people's goals and schedules." },
        { role: "user", content: text }
      ],
      temperature: 0.5,
    }),
  });

  const data = await r.json();
  res.status(200).json(data);
}
