import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Sparkles, Zap, Flame, Heart, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { initialChatMessages, simulatedBotReplies, ChatMessage } from '../data/streamData';

export const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [botIndex, setBotIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), user: "You (Viewer)", badge: "VIEWER", color: "text-amber-400 font-bold", text: text.trim(), time: "Just now" };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setTimeout(() => {
      const nextBotReply = simulatedBotReplies[botIndex % simulatedBotReplies.length];
      const botMessage: ChatMessage = { id: (Date.now() + 1).toString(), user: nextBotReply.user, badge: nextBotReply.badge, color: nextBotReply.color, text: nextBotReply.text, time: "Just now" };
      setMessages(prev => [...prev, botMessage]);
      setBotIndex(prev => prev + 1);
    }, 1100);
  };

  const handleResetChat = () => setMessages(initialChatMessages);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.from('.chat-reveal', {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' }
    });
  }, { scope: sectionRef });

  return (
    <section id="chat" ref={sectionRef} className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-neutral-800/60 pb-5 gap-5">
        <div>
          <div className="chat-reveal inline-flex items-center gap-2 text-rose-500 font-bold text-xs tracking-widest uppercase mb-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
            <MessageSquare className="w-3.5 h-3.5" /><span>Simulated Viewer Chat</span>
          </div>
          <h2 className="chat-reveal font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            INTERACTIVE <span className="text-rose-500">LIVE CHAT</span>
          </h2>
          <p className="chat-reveal text-neutral-400 text-sm sm:text-base">Experience FADE's Hinglish chat. Send messages or tap quick replies.</p>
        </div>
        <button onClick={handleResetChat} className="chat-reveal flex items-center justify-center gap-1.5 bg-neutral-900/60 active:bg-neutral-800/60 text-neutral-300 px-4 py-2 rounded-xl border border-neutral-800/60 text-xs font-bold min-h-[44px] w-full sm:w-auto">
          <RefreshCw className="w-4 h-4 text-rose-500" /><span>Reset Chat</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
        <div className="chat-reveal lg:col-span-8 bg-neutral-900/40 border border-neutral-800/60 rounded-3xl overflow-hidden shadow-xl flex flex-col chat-container relative">
          <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800/60 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-white text-sm">FADE KHELRAHA — LIVE CHAT</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-800/60 rounded-full text-neutral-400">12.4K Watching</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 text-sm bg-neutral-950/40" data-lenis-prevent>
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {msg.badge && <span className={`text-[9px] font-black px-1.5 py-px rounded ${msg.badge === 'MOD' ? 'bg-emerald-600 text-white' : msg.badge === 'VIP' ? 'bg-purple-600 text-white' : msg.badge === 'VIEWER' ? 'bg-amber-500 text-neutral-950' : 'bg-yellow-500 text-neutral-950'}`}>{msg.badge}</span>}
                    <span className={`font-bold text-sm ${msg.color}`}>{msg.user}</span>
                    <span className="text-[10px] text-neutral-500">{msg.time}</span>
                  </div>
                  <p className="text-neutral-200 leading-snug mt-0.5 break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="px-4 pt-2 pb-2 bg-neutral-950 border-t border-neutral-800/60">
            <div className="filter-scroll flex gap-2 text-xs">
              {[{ icon: <Flame className="w-3.5 h-3.5 text-rose-500" />, text: "Fade OP 🔥" }, { icon: <Zap className="w-3.5 h-3.5 text-amber-500" />, text: "Aaja 1v1 🎯" }, { icon: <Heart className="w-3.5 h-3.5 text-pink-500" />, text: "W Stream 💖" }].map((r, i) => (
                <button key={i} onClick={() => handleSendMessage(r.text)} className="px-3.5 py-2 bg-neutral-900/60 active:bg-neutral-800/60 border border-neutral-800/60 rounded-2xl font-bold whitespace-nowrap flex items-center gap-1.5 touch-target">
                  {r.icon} {r.text}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="px-4 py-3 flex gap-2 sm:gap-3">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type in Hinglish... (e.g. bhai 1v1 aaja)" className="flex-1 bg-neutral-900/60 border border-neutral-800/60 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 min-h-[48px]" />
            <button type="submit" disabled={!inputText.trim()} className="px-5 py-3 bg-rose-600 active:bg-rose-500 disabled:bg-neutral-800/60 text-white rounded-2xl font-bold min-w-[52px] flex items-center justify-center touch-target"><Send className="w-5 h-5" /></button>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-4 lg:space-y-5">
          <div className="chat-reveal bg-neutral-900/40 border border-rose-500/25 rounded-3xl p-5 sm:p-6">
            <div className="p-3 bg-rose-600 text-white rounded-2xl w-fit mb-3"><Sparkles className="w-5 h-5" /></div>
            <h4 className="font-bold text-lg text-white">Subscriber Perks</h4>
            <p className="text-sm text-neutral-300 mt-2">Get the SUB badge, priority customs, and exclusive Discord roles.</p>
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-300 bg-neutral-950/60 px-3 py-2 rounded-xl"><span className="bg-yellow-500 text-neutral-950 font-black px-1.5 rounded">SUB</span> Priority in GTA RP</div>
              <div className="flex items-center gap-2 text-neutral-300 bg-neutral-950/60 px-3 py-2 rounded-xl"><span className="bg-purple-600 text-white font-black px-1.5 rounded">VIP</span> Custom match host</div>
            </div>
          </div>
          <div className="chat-reveal bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-5 text-center">
            <div className="text-sm font-bold text-white">Stay active 24/7</div>
            <p className="text-xs text-neutral-400 mt-1">Join the Discord for constant banter & team ups.</p>
            <a href="https://discord.com/invite/JgeNCaJeaM" target="_blank" rel="noreferrer" className="mt-4 inline-block bg-indigo-600 active:bg-indigo-500 px-6 py-2 text-sm font-bold rounded-2xl w-full sm:w-auto">Open Discord</a>
          </div>
        </div>
      </div>
    </section>
  );
};
