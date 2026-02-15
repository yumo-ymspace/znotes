import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  StickyNote, 
  Settings, 
  BookA, 
  Newspaper, 
  FolderOpen, 
  Trophy, 
  Library, 
  Bug, 
  MessageSquare, 
  Upload, 
  CreditCard, 
  Search, 
  User, 
  Menu,
  Bookmark,
  Plus,
  X,
  ChevronRight,
  Clock,
  Star
} from 'lucide-react';

// --- Mock Data ---
const MOCK_NOTES = [
  { id: 1, title: "English vocab (sec 1)", author: "Koh Rui En Bethany", tags: ["Year1", "EXP", "English"], bookmarks: 0 },
  { id: 2, title: "Sec 2 G3 English WA1 2026", author: "Tan Geng Qi", tags: ["Year2", "EXP", "English"], bookmarks: 1 },
  { id: 3, title: "Sec 2 G3 Chinese WA1 2026", author: "Tan Geng Qi", tags: ["Year2", "EXP", "Chinese"], bookmarks: 0 },
  { id: 4, title: "Sec 1 Formula sheet", author: "Koh Rui En Bethany", tags: ["Year1", "EXP", "Math"], bookmarks: 0 },
  { id: 5, title: "FCE Notes Sec 2 WA1", author: "Koh Rui En Bethany", tags: ["Year2", "EXP", "NFS"], bookmarks: 0 },
  { id: 6, title: "Social Studies Issue 1", author: "Kayden", tags: ["Year4", "EXP", "Social Studies"], bookmarks: 0 },
  { id: 7, title: "Social Studies Issues 1–3", author: "Kayden", tags: ["Year4", "EXP", "Social Studies"], bookmarks: 0 },
  { id: 8, title: "Social Studies Issue 3", author: "Kayden", tags: ["Year4", "EXP", "Social Studies"], bookmarks: 0 },
  { id: 9, title: "Social Studies Issue 2", author: "Kayden", tags: ["Year4", "EXP", "Social Studies"], bookmarks: 0 },
  { id: 10, title: "Cold War", author: "Kayden", tags: ["Year4", "EXP", "History"], bookmarks: 0 },
  { id: 11, title: "Sec 1 Geography EOY Notes", author: "Ang Kah Jun", tags: ["Year1", "NA", "Geography"], bookmarks: 1 },
  { id: 12, title: "EOY revision pointers", author: "Koh Rui En Bethany", tags: ["Year1", "EXP", "Science"], bookmarks: 0 }
];

// --- Simple Components ---

const Badge = ({ text }) => {
  let colorClass = "bg-zinc-800 text-zinc-400 border-zinc-700";
  if (text.includes("English")) colorClass = "bg-emerald-950/30 text-emerald-400 border-emerald-900/30";
  if (text.includes("Chinese")) colorClass = "bg-red-950/30 text-red-400 border-red-900/30";
  if (text.includes("Math")) colorClass = "bg-blue-950/30 text-blue-400 border-blue-900/30";
  if (text.includes("Science")) colorClass = "bg-purple-950/30 text-purple-400 border-purple-900/30";

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${colorClass}`}>
      {text}
    </span>
  );
};

const NoteCard = ({ note }) => (
  <div className="group bg-[#121214] border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-600 transition-all cursor-pointer hover:bg-[#161618]">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-zinc-100 font-semibold text-sm leading-snug group-hover:text-emerald-400 transition-colors">
        {note.title}
      </h3>
    </div>
    
    <p className="text-zinc-500 text-xs mb-4">
      By <span className="text-zinc-300 group-hover:underline">{note.author}</span>
    </p>
    
    <div className="flex flex-wrap gap-2 mt-auto">
      {note.tags.map((tag, idx) => <Badge key={idx} text={tag} />)}
    </div>

    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900">
      <div className="flex items-center gap-1.5 text-zinc-600 hover:text-emerald-500 transition-colors">
        <Bookmark size={14} />
        <span className="text-xs">{note.bookmarks}</span>
      </div>
      <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider group-hover:text-zinc-400">View Note</span>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
      ${active 
        ? 'bg-emerald-500/10 text-emerald-400 font-medium' 
        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}
    `}
  >
    <Icon size={18} strokeWidth={active ? 2.5 : 2} className={active ? "text-emerald-400" : "text-zinc-500"} />
    <span>{label}</span>
  </button>
);

// --- Views ---

const NotesView = ({ notes }) => {
  const [search, setSearch] = useState("");

  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.author.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="relative max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Search notes, authors, or tags..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#161618] border border-zinc-800 text-sm text-zinc-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-900/50 placeholder:text-zinc-600 transition-all"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(note => <NoteCard key={note.id} note={note} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-600">
          <p>No notes found.</p>
        </div>
      )}
    </div>
  );
};

const DashboardView = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
    <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6 md:col-span-2">
      <h2 className="text-lg font-semibold text-zinc-100 mb-1">Welcome back, Yan!</h2>
      <p className="text-zinc-500 text-sm mb-6">Here's what's happening with your notes today.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-emerald-900/10 border border-emerald-900/20">
          <div className="text-2xl font-bold text-emerald-400 mb-1">12</div>
          <div className="text-xs text-emerald-600/80 font-medium uppercase">Total Notes</div>
        </div>
        <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-900/20">
          <div className="text-2xl font-bold text-blue-400 mb-1">3</div>
          <div className="text-xs text-blue-600/80 font-medium uppercase">Recent Views</div>
        </div>
      </div>
    </div>

    <div className="bg-[#121214] border border-zinc-800 rounded-xl p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
        <Clock size={16} /> Recent Activity
      </h3>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <div>
              <p className="text-xs text-zinc-300">Viewed "Sec 2 Science"</p>
              <p className="text-[10px] text-zinc-600">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PlaceholderView = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-600 animate-in fade-in duration-500">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4">
      <Icon size={32} className="opacity-50" />
    </div>
    <h2 className="text-xl font-semibold text-zinc-300 mb-2">{title}</h2>
    <p className="max-w-xs text-center text-sm">This feature is currently under development. Check back later!</p>
  </div>
);

// --- Main App ---

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState("notes");
  const [collections, setCollections] = useState(["Exam Prep", "Science Project"]);

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'vocab', label: 'Vocabulary', icon: BookA },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'directory', label: 'Directory', icon: FolderOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return <DashboardView />;
      case 'notes': return <NotesView notes={MOCK_NOTES} />;
      default: 
        const item = MENU_ITEMS.find(i => i.id === currentView);
        return <PlaceholderView title={item?.label} icon={item?.icon || Bug} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c0c0e] border-r border-zinc-900 transform transition-transform duration-300 ease-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-zinc-900/50">
          <div className="bg-emerald-500 p-1.5 rounded-lg">
            <StickyNote size={16} className="text-zinc-950 fill-zinc-950/20" />
          </div>
          <span className="font-bold text-sm tracking-wide">ZNotes</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          <div className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Menu</h3>
            {MENU_ITEMS.map(item => (
              <SidebarItem 
                key={item.id}
                icon={item.icon} 
                label={item.label} 
                active={currentView === item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
              />
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2 group">
              <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Collections</h3>
              <button 
                onClick={() => {
                  const name = prompt("Collection Name:");
                  if(name) setCollections([...collections, name]);
                }}
                className="text-zinc-600 hover:text-emerald-400 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            {collections.map((col, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors text-left">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                <span className="truncate">{col}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-zinc-900/50">
          <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-900 transition-colors text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-500 border border-emerald-900/50">
              <User size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-200 truncate">Yan Yumo</p>
              <p className="text-[10px] text-zinc-500 truncate">Student</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b]">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-900/50 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-zinc-400 hover:text-white">
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-zinc-400">Portal</span>
              <ChevronRight size={14} className="text-zinc-700" />
              <span className="text-zinc-200 capitalize">{currentView}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Simplified Right Actions */}
             <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-500">
                GB
             </div>
          </div>
        </header>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>
    </div>
  );
}
