import { useState } from 'react';
import axios from 'axios';
import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/solid';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('ru');

  const translations = {
    ru: {
      title: 'Чат-GPT Мессенджер',
      placeholder: 'Введите сообщение...',
      error: 'Ошибка получения ответа.',
      switchLang: 'Сменить язык',
    },
    en: {
      title: 'ChatGPT Messenger',
      placeholder: 'Type a message...',
      error: 'Error receiving reply.',
      switchLang: 'Switch language',
    },
  };

  const t = translations[language];

  const handleSend = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message,
        language, 
      });
      setReply(res.data.reply);
      setMessage(''); 
    } catch (err) {
      setReply(t.error);
    }
    setLoading(false);
  };

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language === 'ru' ? 'ru-RU' : 'en-US';
    recognition.start();
    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-950 to-black p-4">
      <div className="w-full max-w-md min-h-[250px] bg-[#0F172A] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">

        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-3 text-lg font-semibold shadow">
          {t.title}
          <button
            onClick={toggleLanguage}
            className="bg-blue-800 hover:bg-blue-700 text-sm px-3 py-1 rounded-full transition"
          >
            {t.switchLang}
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {reply && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white p-3 rounded-2xl rounded-bl-none shadow max-w-[75%]">
                {reply}
              </div>
            </div>
          )}
          {message && (
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-none shadow max-w-[75%]">
                {message}
              </div>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-700 bg-[#1E293B]">
          <button
            onClick={handleSpeech}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <MicrophoneIcon className="h-6 w-6 text-gray-300" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(); 
            }}
            placeholder={t.placeholder}
            className="flex-1 p-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;




