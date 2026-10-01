import { useState } from 'react'
import './App.css'

function App() {
  const [language, setLanguage] = useState('')
  const [message, setMessage] = useState('')

  const handleSend = async () => {
    if (!message.trim()) return

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      })

      const data = await response.json()

      alert(data.reply)
    } catch (error) {
      console.error(error)
      alert('தற்போது உதவி கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.')
    }
  }

  const handleSpeak = () => {
    alert('Microphone button clicked!')

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'ta-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      alert('Listening... பேசுங்கள்!')
    }

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setMessage(text)
      alert('I heard: ' + text)
    }

    recognition.onerror = (event) => {
      alert('Voice error: ' + event.error)
    }

    recognition.onend = () => {
      console.log('Voice recognition ended')
    }

    recognition.start()
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Thunai</h1>

        {!language && (
          <>
            <p>தமிழில் தொடரவும்</p>

            <button onClick={() => setLanguage('tamil')}>
              தமிழ்
            </button>
          </>
        )}

        {language && (
          <>
            <p>உங்களுக்கு என்ன உதவி வேண்டும்?</p>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="உங்கள் பிரச்சனையை எழுதுங்கள்..."
            />

            <button onClick={handleSpeak}>
              🎙️ Speak
            </button>

            <button onClick={handleSend}>
              உதவி கேட்க
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App