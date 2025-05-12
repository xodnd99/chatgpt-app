const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // или 'meta-llama/llama-3-8b-instruct' если хочешь LLaMA
        messages: [
          { role: 'system', content: `Respond in ${language}. You are a helpful assistant.` },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://yourapp.com', // можно заменить на свою ссылку
          'X-Title': 'My Chat App' // произвольное название
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


