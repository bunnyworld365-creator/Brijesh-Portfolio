import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, User, Loader2, 
  MessageSquare, ExternalLink, ShieldCheck, Zap 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface LiveConsultantBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LiveConsultantBot: React.FC<LiveConsultantBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm Brijesh's AI technical advisor. Brijesh has 7+ years of international electrical and automation foreman experience (Europe & India), and builds high-reliability AI workflows (n8n, Make, Vapi, Hermes Agent). How can I assist you with your project or hire him for a contract?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What was your role in the IOCL DEF Plant?',
    'How do you build Voice AI agents with Vapi?',
    'What are your Upwork & Fiverr turnaround rates?',
    'Tell me about your Rotterdam marine electrical work.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || input;
    if (!messageContent.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          chatHistory,
        }),
      });

      if (!res.ok) {
        throw new Error('Chat API returned error');
      }

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I am available to assist with any technical or freelance scope questions!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Brijesh is actively available for Upwork & Fiverr freelance contracts. You can also reach him directly at ${PERSONAL_INFO.email} for high-priority inquiries.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="floating-ai-consultant-btn"
          onClick={onToggle}
          aria-label="Open AI Technical Advisor"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group font-bold text-xs"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 -right-1 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <span className="hidden sm:inline font-bold">Ask AI Consultant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[400px] h-[540px] max-h-[85vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl text-left">
          
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Bot className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-slate-950" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Brijesh AI Technical Advisor</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span>● Online • Gemini-Powered</span>
                </div>
              </div>
            </div>

            <button
              onClick={onToggle}
              aria-label="Close Chat"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-3.5 bg-slate-950/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div
                    className={`text-[9px] mt-1 font-mono ${
                      msg.role === 'user' ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 text-[10px]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-amber-400 bg-slate-900 border border-slate-800 p-2.5 rounded-xl w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Brijesh AI is drafting response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="p-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 custom-scrollbar">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              id="live-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about IOCL DEF, n8n, Vapi, rates..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
