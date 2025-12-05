import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data';
import { Clock, Calendar, Facebook, Twitter, Linkedin, Link as LinkIcon, User, MessageCircle, Edit2, X, Check, Sparkles, Loader2 } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { GoogleGenAI } from "@google/genai";

interface Reply {
  id: number;
  author: string;
  date: string;
  content: string;
  isAuthor?: boolean;
  isOwn?: boolean;
}

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: Reply[];
  isOwn?: boolean;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Sarah Jenkins",
    date: "Oct 12, 2023",
    content: "This really resonated with me. Especially the part about starting small. I've been trying to do too much at once, and it always leads to burnout. The 1% rule is a game changer.",
    replies: []
  },
  {
    id: 2,
    author: "David Chen",
    date: "Oct 13, 2023",
    content: "Great insights as always. Would love to see a follow-up on specific tools you use for keeping track of these micro-habits. Do you use digital tools or pen and paper?",
    replies: [
         {
            id: 3,
            author: "Abdul Azeem",
            date: "Oct 13, 2023",
            content: "Thanks David! That is in the works. I mostly use a simple physical journal for habit tracking—it creates a better feedback loop for me than apps.",
            isAuthor: true
         }
    ]
  }
];

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);
  const relatedPosts = posts.filter(p => p.slug !== slug).slice(0, 3);
  
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Edit State
  const [editingItem, setEditingItem] = useState<{ type: 'comment' | 'reply', id: number } | null>(null);
  const [editContent, setEditContent] = useState('');

  // Table of Contents State
  const [toc, setToc] = useState<{id: string, text: string, level: number}[]>([]);
  const [contentWithIds, setContentWithIds] = useState('');
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // AI Summary State
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset discussion and summary state on article change
    setComments(initialComments);
    setNewComment('');
    setReplyingTo(null);
    setEditingItem(null);
    setSummary(null);
    setIsSummarizing(false);
  }, [slug]);

  // Generate TOC and Inject IDs
  useEffect(() => {
    if (post) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      
      const headings = tempDiv.querySelectorAll('h2, h3');
      const tocData: {id: string, text: string, level: number}[] = [];
      
      headings.forEach((heading, index) => {
        const text = heading.textContent || '';
        // Create a simple slug-like ID
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const uniqueId = id || `section-${index}`;
        
        heading.id = uniqueId;
        tocData.push({
          id: uniqueId,
          text,
          level: parseInt(heading.tagName.substring(1))
        });
      });
      
      setToc(tocData);
      setContentWithIds(tempDiv.innerHTML);
    }
  }, [post]);

  // Handle Scroll Spy for TOC
  useEffect(() => {
    if (toc.length === 0) return;

    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that is most visible or first intersecting
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry) {
        setActiveId(visibleEntry.target.id);
      }
    };

    const observerOptions = {
      // Offset to consider the fixed header and give some breathing room
      // Trigger when the element is in the top 40% of the viewport
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    toc.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [toc, contentWithIds]);

  const handleSummarize = async () => {
    if (!post) return;
    setIsSummarizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Extract clean text from content for the model
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const cleanText = tempDiv.textContent || "";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert editor. Summarize the following article in 3-4 concise, high-impact bullet points. Format the output as a Markdown list.\n\nTitle: ${post.title}\n\n${cleanText}`,
      });
      
      setSummary(response.text || "Could not generate summary.");
    } catch (error) {
      console.error("Summarization failed:", error);
      setSummary("Sorry, I couldn't generate a summary at this moment. Please try again later.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
        id: Date.now(),
        author: "Guest User",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: newComment,
        replies: [],
        isOwn: true
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handlePostReply = (commentId: number) => {
    if (!replyContent.trim()) return;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              author: "Guest User",
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              content: replyContent,
              isOwn: true
            }
          ]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
  };

  const startEditing = (type: 'comment' | 'reply', id: number, currentContent: string) => {
    setEditingItem({ type, id });
    setEditContent(currentContent);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditContent('');
  };

  const saveEditComment = (id: number) => {
    if (!editContent.trim()) return;
    setComments(comments.map(c => c.id === id ? { ...c, content: editContent } : c));
    cancelEditing();
  };

  const saveEditReply = (commentId: number, replyId: number) => {
    if (!editContent.trim()) return;
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: c.replies.map(r => r.id === replyId ? { ...r, content: editContent } : r)
        };
      }
      return c;
    }));
    cancelEditing();
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Manually update active ID first for immediate feedback
      setActiveId(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!post) {
    return <div className="text-center py-20 text-2xl font-serif">Article not found.</div>;
  }

  return (
    <article className="animate-in fade-in duration-500">
      {/* Header */}
      <header className="container mx-auto px-4 md:px-6 pt-12 pb-8 max-w-3xl text-center">
        <Link to={`/category/${post.category.toLowerCase()}`} className="inline-block text-xs font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-6 hover:text-zinc-900 dark:hover:text-white transition-colors">
          {post.category}
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-zinc-900 dark:text-white leading-tight mb-8">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-zinc-500 dark:text-zinc-400 text-sm">
           <div className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden mr-3">
               <img src="https://picsum.photos/seed/azeem/100/100" alt="Author" />
             </div>
             <span className="font-medium text-zinc-900 dark:text-white">Abdul Azeem</span>
           </div>
           <span className="hidden md:inline">•</span>
           <div className="flex items-center">
             <Calendar size={14} className="mr-2" />
             {post.date}
           </div>
           <span className="hidden md:inline">•</span>
           <div className="flex items-center">
             <Clock size={14} className="mr-2" />
             {post.readTime}
           </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-4 md:px-6 mb-16 max-w-5xl">
        <div className="aspect-[2/1] w-full overflow-hidden rounded-xl shadow-sm">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col md:flex-row gap-12">
        
        {/* Sidebar (TOC & Share) - Sticky on Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            {toc.length > 0 && (
              <div className="mb-12">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Table of Contents</h4>
                <nav className="relative">
                  {/* Decorative vertical line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"></div>
                  
                  <ul className="space-y-4 text-sm">
                    {toc.map((item) => (
                      <li key={item.id} className={`${item.level === 3 ? 'ml-4' : ''}`}>
                        <a 
                          href={`#${item.id}`} 
                          onClick={(e) => scrollToSection(e, item.id)}
                          className={`block pl-4 border-l-2 transition-all duration-300 ease-out ${
                            activeId === item.id 
                              ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-bold -ml-[1px]' 
                              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Share</h4>
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"><Twitter size={18} /></button>
              <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"><Linkedin size={18} /></button>
              <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"><Facebook size={18} /></button>
              <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"><LinkIcon size={18} /></button>
            </div>
          </div>
        </aside>

        {/* Main Content Body */}
        <div className="flex-1 max-w-2xl mx-auto">
          
          {/* AI Summary Section */}
          <div className="mb-12">
            {!summary && !isSummarizing ? (
              <button 
                onClick={handleSummarize}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all group"
              >
                <Sparkles size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">Summarize with AI</span>
              </button>
            ) : isSummarizing ? (
              <div className="w-full py-8 flex flex-col items-center justify-center gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800">
                <Loader2 size={24} className="animate-spin text-zinc-400" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Generating Insights...</span>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-zinc-800 dark:to-zinc-900 border border-purple-100 dark:border-zinc-700 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                   <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
                   <h3 className="text-sm font-bold uppercase tracking-widest text-purple-900 dark:text-purple-300">AI Key Takeaways</h3>
                </div>
                <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: summary ? summary.replace(/\n/g, '<br />') : '' }} />
                </div>
              </div>
            )}
          </div>

          {/* Article Text */}
          <div 
            className="prose prose-lg dark:prose-invert prose-zinc prose-headings:font-serif prose-headings:font-bold prose-headings:scroll-mt-32 prose-a:text-zinc-900 dark:prose-a:text-white prose-img:rounded-xl mb-16"
            dangerouslySetInnerHTML={{ __html: contentWithIds || post.content }}
          />

          {/* Post Footer: Tags & Share Mobile */}
          <div className="border-t border-b border-zinc-200 dark:border-zinc-800 py-8 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex gap-2">
                 <span className="text-sm font-medium text-zinc-500 mr-2">Tags:</span>
                 <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
                 <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">Growth</span>
               </div>
               <div className="flex gap-4 md:hidden">
                  <button className="text-zinc-500"><Twitter size={20} /></button>
                  <button className="text-zinc-500"><Linkedin size={20} /></button>
                  <button className="text-zinc-500"><LinkIcon size={20} /></button>
               </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-xl flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-20">
             <div className="w-20 h-20 rounded-full bg-zinc-300 overflow-hidden flex-shrink-0">
               <img src="https://picsum.photos/seed/azeem/200/200" alt="Abdul Azeem" className="w-full h-full object-cover" />
             </div>
             <div className="text-center sm:text-left">
               <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white mb-2">About Abdul Azeem</h3>
               <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                 Abdul is an entrepreneur and writer focused on human potential. He breaks down complex ideas into actionable strategies for life and business.
               </p>
               <Link to="/about" className="text-sm font-bold text-zinc-900 dark:text-white hover:underline">More about me &rarr;</Link>
             </div>
          </div>
          
          {/* Discussion / Comments Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                Discussion <span className="text-zinc-400 text-lg font-normal">({comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0)})</span>
            </h3>
            
            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="mb-12">
                <textarea
                    className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-1 focus:ring-zinc-400 dark:text-zinc-200 transition-all resize-none font-sans"
                    rows={3}
                    placeholder="Share your insights..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-md hover:opacity-90 transition-opacity"
                    >
                        Post Comment
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-10">
                {comments.map(comment => (
                    <div key={comment.id} className="animate-in fade-in duration-300">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 font-serif font-bold flex-shrink-0">
                                {comment.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{comment.author}</h4>
                                    <span className="text-xs text-zinc-500">{comment.date}</span>
                                </div>
                                
                                {editingItem?.type === 'comment' && editingItem.id === comment.id ? (
                                    <div className="mb-3">
                                        <textarea
                                            className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md outline-none focus:ring-1 focus:ring-zinc-400 dark:text-zinc-200 text-sm resize-none"
                                            rows={3}
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button 
                                                onClick={cancelEditing}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                            >
                                                <X size={12} /> Cancel
                                            </button>
                                            <button 
                                                onClick={() => saveEditComment(comment.id)}
                                                className="flex items-center gap-1 px-4 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded hover:opacity-90"
                                            >
                                                <Check size={12} /> Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-3">
                                        {comment.content}
                                    </p>
                                )}

                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white uppercase tracking-wider flex items-center gap-1"
                                    >
                                        Reply
                                    </button>
                                    {comment.isOwn && editingItem?.id !== comment.id && (
                                        <button 
                                            onClick={() => startEditing('comment', comment.id, comment.content)}
                                            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white uppercase tracking-wider flex items-center gap-1"
                                        >
                                            <Edit2 size={12} /> Edit
                                        </button>
                                    )}
                                </div>
                                
                                {/* Reply Input */}
                                {replyingTo === comment.id && (
                                    <div className="mt-4 animate-in slide-in-from-top-2">
                                        <textarea
                                            className="w-full p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md outline-none focus:ring-1 focus:ring-zinc-400 dark:text-zinc-200 text-sm resize-none"
                                            rows={2}
                                            placeholder="Write a reply..."
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button 
                                                onClick={() => setReplyingTo(null)}
                                                className="px-3 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={() => handlePostReply(comment.id)}
                                                className="px-4 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded hover:opacity-90"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Nested Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="mt-6 space-y-6 pl-6 border-l-2 border-zinc-100 dark:border-zinc-800">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="flex gap-4 group">
                                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs ${reply.isAuthor ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}>
                                                    {reply.isAuthor ? 'AA' : reply.author.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{reply.author}</h4>
                                                        {reply.isAuthor && <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500 uppercase tracking-widest font-bold">Author</span>}
                                                        <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
                                                        <span className="text-xs text-zinc-500">{reply.date}</span>
                                                    </div>

                                                    {editingItem?.type === 'reply' && editingItem.id === reply.id ? (
                                                        <div className="mb-2">
                                                            <textarea
                                                                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md outline-none focus:ring-1 focus:ring-zinc-400 dark:text-zinc-200 text-sm resize-none"
                                                                rows={2}
                                                                value={editContent}
                                                                onChange={(e) => setEditContent(e.target.value)}
                                                                autoFocus
                                                            />
                                                            <div className="flex justify-end gap-2 mt-2">
                                                                <button 
                                                                    onClick={cancelEditing}
                                                                    className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                                                >
                                                                    <X size={10} /> Cancel
                                                                </button>
                                                                <button 
                                                                    onClick={() => saveEditReply(comment.id, reply.id)}
                                                                    className="flex items-center gap-1 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded hover:opacity-90"
                                                                >
                                                                    <Check size={10} /> Save
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                                                {reply.content}
                                                            </p>
                                                            {reply.isOwn && (
                                                                <button 
                                                                    onClick={() => startEditing('reply', reply.id, reply.content)}
                                                                    className="mt-2 text-[10px] font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <Edit2 size={10} /> Edit
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl text-center mb-20">
            <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-4">Enjoyed this article?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">Join the weekly newsletter for more deep dives like this.</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md outline-none focus:ring-1 focus:ring-zinc-400" />
              <button className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-md hover:opacity-90">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-zinc-50 dark:bg-zinc-900 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-8">Read Next</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(p => (
              <ArticleCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;