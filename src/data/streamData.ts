export interface Clip {
  id: string;
  title: string;
  game: string;
  views: string;
  duration: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
  type: 'vod' | 'clip';
}

export interface ScheduleItem {
  day: string;
  time: string;
  game: string;
  title: string;
  isLive?: boolean;
}

export interface GearItem {
  category: string;
  name: string;
  spec: string;
  icon: string;
  rating: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  badge?: string;
  color: string;
  text: string;
  time: string;
}

export const streamerProfile = {
  name: "FADE KHELRAHA",
  tagline: "Indian gamer • Hinglish streams",
  bio: "Yo guys! Welcome to the official hub of FADE. High-octane gameplay, chaotic discord calls, toxic banters, and top-tier clutches in Rainbow Six Siege, Call of Duty, and GTA V RP. Regular streams at 9 PM IST. Subscribe & turn on notifications so you never miss a clutch!",
  subscribers: "19.7K",
  totalViews: "14.2M",
  peakViewers: "12.4K",
  location: "Kolkata, India",
  preferredLanguage: "Hindi + English (Hinglish)",
  socials: {
    youtube: "https://youtube.com/@fadekhelraha",
    instagram: "https://instagram.com/fadekhelraha",
    discord: "https://discord.com/invite/JgeNCaJeaM",
    twitter: "https://twitter.com/fadekhelraha",
    twitch: "https://www.twitch.tv/fadekhelraha"
  }
};

export const scheduleData: ScheduleItem[] = [
  { day: "Monday", time: "9:00 PM IST", game: "FPS / Tactical", title: "Solo to Radiant Grind + Viewers Custom 🏆" },
  { day: "Tuesday", time: "9:00 PM IST", game: "Battle Royale", title: "Conqueror Lobby Push with the Boys 🔥" },
  { day: "Wednesday", time: "8:30 PM IST", game: "Story Game", title: "Mumbai Mafia RP - Bank Heist Setup 💰", isLive: true },
  { day: "Thursday", time: "9:00 PM IST", game: "Competitive FPS", title: "Premier Mode Elo Farm & Box Openings 📦" },
  { day: "Friday", time: "10:00 PM IST", game: "Horror", title: "Phasmophobia & Chill (Fatt gayi bhai 💀)" },
  { day: "Saturday", time: "7:00 PM IST", game: "IRL / Adventure", title: "Reddit Review & Reacting to Indian Gaming Memes 🤣" },
  { day: "Sunday", time: "6:00 PM IST", game: "Community Games", title: "Community Sub Wars & Giveaway 🎁" }
];

export const clipsData: Clip[] = [
  {
    id: "clip-1",
    title: "1v5 Insane Ace in Immortal Lobby! (Pure Crisp Aim)",
    game: "Valorant",
    views: "210K",
    duration: "10:45",
    date: "2 days ago",
    thumbnail: "https://images.pexels.com/photos/15367435/pexels-photo-15367435.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    videoUrl: "https://videos.pexels.com/video-files/9070651/9070651-uhd_3840_2160_25fps.mp4",
    type: "vod"
  },
  {
    id: "clip-2",
    title: "Bhai kya hi maara! Last zone 1v4 BGMI Clutch 🔥",
    game: "BGMI",
    views: "345K",
    duration: "14:20",
    date: "4 days ago",
    thumbnail: "https://images.pexels.com/photos/9072276/pexels-photo-9072276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    videoUrl: "https://videos.pexels.com/video-files/7849771/7849771-uhd_4096_2160_25fps.mp4",
    type: "vod"
  },
  {
    id: "clip-3",
    title: "Police Chase Gone Wrong in GTA RP (Full Comedy) 🚓",
    game: "GTA V RP",
    views: "189K",
    duration: "18:12",
    date: "1 week ago",
    thumbnail: "https://images.pexels.com/photos/9072382/pexels-photo-9072382.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    videoUrl: "https://videos.pexels.com/video-files/8128278/8128278-uhd_3840_2160_25fps.mp4",
    type: "vod"
  },
  {
    id: "clip-4",
    title: "When your teammate doesn't know left from right 🤣",
    game: "Valorant",
    views: "89K",
    duration: "0:59",
    date: "Yesterday",
    thumbnail: "https://images.pexels.com/photos/9072269/pexels-photo-9072269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    videoUrl: "https://videos.pexels.com/video-files/9070651/9070651-uhd_3840_2160_25fps.mp4",
    type: "clip"
  },
  {
    id: "clip-5",
    title: "Unboxing my new RTX 4090 rig (Kidney bech diya 🥲)",
    game: "Setup",
    views: "420K",
    duration: "12:30",
    date: "2 weeks ago",
    thumbnail: "https://images.pexels.com/photos/7858742/pexels-photo-7858742.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    videoUrl: "https://videos.pexels.com/video-files/7849771/7849771-uhd_4096_2160_25fps.mp4",
    type: "vod"
  },
  {
    id: "clip-6",
    title: "Ninja Defuse in CS2 Major Overpass! 🧠 Big Brain",
    game: "CS2",
    views: "156K",
    duration: "0:45",
    date: "3 weeks ago",
    thumbnail: "https://images.pexels.com/photos/9072286/pexels-photo-9072286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    videoUrl: "https://videos.pexels.com/video-files/8128278/8128278-uhd_3840_2160_25fps.mp4",
    type: "clip"
  }
];

export const gearData: GearItem[] = [
  { category: "GPU", name: "NVIDIA RTX 5070", spec: "Next-Gen Architecture - 12GB GDDR7 Memory", icon: "Cpu", rating: "Next-Gen Performance" },
  { category: "Processor", name: "AMD Ryzen 5 7600X", spec: "6 Cores / 12 Threads @ 5.3 GHz Max Boost", icon: "Flame", rating: "Ultra Gaming Engine" },
  { category: "Motherboard", name: "MSI B650-M GAMING PLUS WIFI", spec: "DDR5 Support, Dual-Band High Speed WiFi 6E", icon: "Cpu", rating: "Super Stable Platform" },
  { category: "RAM", name: "32 GB DDR5 RAM", spec: "Dual-Channel Overclocked Gaming Memory", icon: "Cpu", rating: "Ultra Fast Multi-tasking" },
  { category: "Monitor", name: "Viewsonic 27\" 170Hz", spec: "27-inch Fast IPS Panel, 1ms Response Time", icon: "Monitor", rating: "Super Smooth 170Hz" },
  { category: "Microphone", name: "Elgato Wave Neo", spec: "Premium USB Condenser Mic with Wave Link Mixer", icon: "Mic", rating: "Studio Voice Clarity" },
  { category: "Headset", name: "Razer Blackshark V2", spec: "TriForce Titanium 50mm Drivers, USB Sound Card", icon: "Headphones", rating: "Esports Spatial Sound" },
  { category: "Keyboard", name: "Ant Esports MK 1000 TKL", spec: "Outemu Blue Mechanical Switches, RGB Backlit TKL", icon: "Mouse", rating: "Tactile Response" },
  { category: "Mouse", name: "Logitech G304", spec: "LIGHTSPEED Wireless Hero Sensor, 12,000 DPI", icon: "Mouse", rating: "Zero Latency Wireless" }
];

export const initialChatMessages: ChatMessage[] = [
  { id: "1", user: "Vikram_Gaming", badge: "MOD", color: "text-emerald-400", text: "Welcome to the stream guys! Remember to keep chat respectful.", time: "9:01 PM" },
  { id: "2", user: "Pooja_Sharma", color: "text-pink-400", text: "Fade OP! Bhai kab shuru hoga custom match?", time: "9:02 PM" },
  { id: "3", user: "Rohan_Beast", badge: "SUB", color: "text-yellow-400", text: "Drop your shorts link bro! Full support 🔥", time: "9:02 PM" },
  { id: "4", user: "Aaditya_OP", color: "text-cyan-400", text: "Bhai ping kyu high aa raha hai aaj? 😅", time: "9:03 PM" },
  { id: "5", user: "Siddharth_99", badge: "VIP", color: "text-purple-400", text: "Big fan from Delhi! W stream as always 💖", time: "9:03 PM" },
  { id: "6", user: "ChintuKhelRaha", color: "text-rose-400", text: "Aaja 1v1 on Rust, noobda 🤣", time: "9:04 PM" },
  { id: "7", user: "NehaGamer", badge: "SUB", color: "text-yellow-400", text: "Which graphic settings for Valorant bro?", time: "9:04 PM" }
];

export const simulatedBotReplies = [
  { user: "GamerBhai_007", color: "text-sky-400", text: "Bhai yeh clutch dekha? Absolute insane aim! 🔥" },
  { user: "Ananya_Plays", badge: "SUB", color: "text-yellow-400", text: "+11111 Fade is literal god in this lobby" },
  { user: "ToxicRaze", color: "text-amber-500", text: "Raid incoming guys! Spamm W in the chat! 🚀" },
  { user: "TusharM", badge: "MOD", color: "text-emerald-400", text: "@ChintuKhelRaha timeout milega bhai jyada mat bol 😅" },
  { user: "ViperMain", color: "text-violet-400", text: "Bhai next match me invite dena please!" },
  { user: "Rahul_S", color: "text-emerald-300", text: "Op op op op 🔥🔥🔥🔥" }
];
