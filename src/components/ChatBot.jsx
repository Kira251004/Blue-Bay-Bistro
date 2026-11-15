import { useEffect, useRef, useState } from 'react';
import aiData from '../data/aiData.js';

// Find the dataset entry whose keyword appears in the question
function getAnswer(question) {
  const text = question.toLowerCase();
  const match = aiData.find((entry) => entry.keywords.some((word) => text.includes(word)));
  return match ? match.answer : "Sorry, I don't know that yet. Try one of the questions below!";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false); // is the chat window open?
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm the Golden Fork assistant. Ask me about our food." },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null); // points at an empty div at the end of the messages

  // After every new message, scroll down to the bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send(question) {
    if (question.trim() === '') return;
    const answer = getAnswer(question);
    // Add the customer's question AND the bot's answer to the list
    setMessages([...messages, { from: 'user', text: question }, { from: 'bot', text: answer }]);
    setInput('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {/* The round button in the corner */}
      <button className="chat-fab" onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬 Ask AI'}
      </button>

      {/* The chat window, only when open */}
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <strong>🤖 AI Assistant</strong>
            <button className="alert-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, index) => (
              <div key={index} className={'chat-msg ' + m.from}>
                <p>{m.text}</p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick-question buttons: the 6 sample questions from the dataset */}
          <div className="chat-suggestions">
            {aiData.slice(0, 6).map((entry) => (
              <button key={entry.question} onClick={() => send(entry.question)}>
                {entry.question}
              </button>
            ))}
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question..." />
            <button className="btn">Send</button>
          </form>
        </div>
      )}
    </>
  );
}