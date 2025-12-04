import React, { useState, useRef, useEffect } from 'react';
import { askAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Xin chào! Tôi là trợ lý ảo của bạn. Bạn muốn hỏi về ngày lành tháng tốt, phong thủy hay kiến thức đời sống hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await askAssistant(input);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  const suggestions = [
    "Hôm nay là ngày tốt hay xấu?",
    "Tuổi 1995 năm 2025 sao gì chiếu?",
    "Đặt bếp hướng nào tốt?",
    "Văn khấn mùng 1"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
       <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Trợ Lý AI Thông Thái</h3>
            <p className="text-xs text-green-100 opacity-90">Hỏi đáp mọi lúc, mọi nơi</p>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                 <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.text}</p>
                 <span className={`text-[10px] mt-1 block ${msg.role === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                   {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                 </span>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-200 shadow-sm flex items-center space-x-2">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
       </div>

       {messages.length === 1 && (
         <div className="px-4 pb-2 bg-gray-50">
           <div className="text-xs text-gray-500 mb-2 font-medium">Gợi ý câu hỏi:</div>
           <div className="flex flex-wrap gap-2">
             {suggestions.map((s, i) => (
               <button 
                 key={i} 
                 onClick={() => setInput(s)}
                 className="text-xs bg-white border border-gray-200 text-gray-600 hover:text-green-600 hover:border-green-300 px-3 py-1.5 rounded-full transition"
                >
                 {s}
               </button>
             ))}
           </div>
         </div>
       )}

       <div className="p-4 bg-white border-t border-gray-100">
         <div className="flex items-center gap-2">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Nhập câu hỏi của bạn..."
             className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
           />
           <button 
             onClick={handleSend}
             disabled={!input.trim() || loading}
             className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:opacity-50 transition shadow-md"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
           </button>
         </div>
       </div>
    </div>
  );
};

export default Assistant;
