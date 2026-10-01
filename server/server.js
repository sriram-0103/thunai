import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message

    const interaction = await ai.interactions.create({
  model: 'gemini-3.8-flash',
  input: `
You are Thunai, a simple government-help assistant for first-time users.

Always respond in simple Tamil.
Use short and easy sentences.
Ask only one question at a time.
Never use difficult technical words.

User message:
${userMessage}
`,
})

    res.json({
      reply: interaction.output_text,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Gemini request failed',
    })
  }
})

app.get('/', (req, res) => {
  res.send('Thunai backend is running!')
})

app.listen(5000, () => {
  console.log('Thunai server running on http://localhost:5000')
})