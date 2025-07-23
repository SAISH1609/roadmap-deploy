// Enhanced AITutorChat.tsx with full response + improved design
import { useRef, useState, useEffect } from "react";
import type { Message } from "../../types";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function formatAIResponse(text: string) {
  const codeBlockRegex = /```([\s\S]*?)```/g;
  let parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  function formatBold(line: string) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldParts: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    let i = 0;
    while ((m = boldRegex.exec(line))) {
      if (m.index > last) {
        boldParts.push(<span key={i++}>{line.slice(last, m.index)}</span>);
      }
      boldParts.push(<strong key={i++}>{m[1]}</strong>);
      last = m.index + m[0].length;
    }
    if (last < line.length) {
      boldParts.push(<span key={i++}>{line.slice(last)}</span>);
    }
    return boldParts;
  }

  function highlight(line: string, key: number) {
    const heading = /^##\s+(.*)/i;
    const bullet = /^[-*•]\s+(.*)/i;

    if (heading.test(line)) {
      const [, title] = line.match(heading)!;
      return <h2 key={key} className="text-lg font-bold text-indigo-600 my-4">{title}</h2>;
    }
    if (bullet.test(line)) {
      const [, content] = line.match(bullet)!;
      return <li key={key} className="ml-6 list-disc text-sm text-gray-800 dark:text-gray-200">{formatBold(content)}</li>;
    }
    return <p key={key} className="text-sm text-gray-700 dark:text-gray-300 my-1">{formatBold(line)}</p>;
  }

  while ((match = codeBlockRegex.exec(text))) {
    if (match.index > lastIndex) {
      const lines = text.slice(lastIndex, match.index).split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== "") parts.push(highlight(lines[i], idx++));
      }
    }
    parts.push(
      <pre
        key={`code-${idx++}`}
        className="bg-zinc-900 text-white text-xs md:text-sm p-4 rounded-lg overflow-x-auto my-4"
      >
        <code>{match[1]}</code>
      </pre>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const lines = text.slice(lastIndex).split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "") parts.push(highlight(lines[i], idx++));
    }
  }
  return parts;
}

export default function AITutorChat() {
  const [messages, setMessages] = useState<Message[]>([{
    sender: "ai",
    text: "Hi! I'm your AI Tutor. Ask me anything about tech, code, or learning!"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!GEMINI_API_KEY) {
      const errorMsg: Message = { sender: "ai", text: "❌ API key missing." };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    const userMsg: Message = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
        }
      );

      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { sender: "ai", text: `❌ Error: ${data.error.message}` }]);
        return;
      }

      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "⚠️ I couldn't generate a response.";
      setMessages(prev => [...prev, { sender: "ai", text: aiText }]);
    } catch {
      setMessages(prev => [...prev, { sender: "ai", text: "⚠️ Network error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col items-center justify-center">
        <div className="bg-white text-black font-bold text-2xl w-14 h-14 flex items-center justify-center rounded-lg mb-3">AI</div>
        <div className="text-xl font-semibold mb-1">AI Tutor</div>
        <p className="text-xs text-gray-400 text-center">Your personalized learning companion</p>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 shadow-xl rounded-2xl border border-gray-200 dark:border-zinc-800">
          <div className="text-center text-xl font-bold text-gray-900 dark:text-white py-6 border-b border-gray-200 dark:border-zinc-700">
            How can I help you?
          </div>
          <div className="px-6 py-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 rounded-lg max-w-full md:max-w-xl whitespace-pre-wrap text-sm font-normal shadow-md border ${
                    msg.sender === "user"
                      ? "bg-black text-white border-zinc-700"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {msg.sender === "ai" ? formatAIResponse(msg.text) : msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-zinc-700">
            <input
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}