import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from '../supabase';

const Comment = memo(({ comment, formatDate, index, isPinned = false }) => (
    <div 
        className={`px-4 pt-4 pb-2 rounded-2xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 ${
            isPinned 
                ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }`}
    >
        {isPinned && (
            <div className="flex items-center gap-2 mb-3 text-[#0071E3]">
                <Pin className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Pinned Comment</span>
            </div>
        )}
        <div className="flex items-start gap-3">
            {comment.profile_image ? (
                <img
                    src={comment.profile_image}
                    alt={`${comment.user_name}'s profile`}
                    className={`w-10 h-10 rounded-full object-cover border-2 flex-shrink-0 ${
                        isPinned ? 'border-[#0071E3]/50' : 'border-white/10'
                    }`}
                    loading="lazy"
                />
            ) : (
                <div className={`p-2 rounded-full text-[#0071E3] transition-colors ${
                    isPinned ? 'bg-[#0071E3]/20' : 'bg-white/5'
                }`}>
                    <UserCircle2 className="w-5 h-5 text-[#86868b]" />
                </div>
            )}
            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                        <h4 className={`font-medium text-sm truncate ${
                            isPinned ? 'text-white' : 'text-[#f5f5f7]'
                        }`}>
                            {comment.user_name}
                        </h4>
                        {isPinned && (
                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#0071E3]/20 text-[#0071E3] rounded-full">
                                Admin
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-[#86868b] whitespace-nowrap">
                        {formatDate(comment.created_at)}
                    </span>
                </div>
                <p className="text-[#86868b] text-sm break-words leading-relaxed relative bottom-1 font-normal">
                    {comment.content}
                </p>
            </div>
        </div>
    </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB. Please choose a smaller image.');
                if (e.target) e.target.value = '';
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                if (e.target) e.target.value = '';
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) return;
        onSubmit({ newComment, userName, imageFile });
        setNewComment('');
        setUserName('');
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [newComment, userName, imageFile, onSubmit]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                <label className="block text-xs font-medium text-[#86868b] uppercase tracking-wider">
                    Name <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={15}
                    placeholder="Enter your name"
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#f5f5f7] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0071E3]/60 focus:bg-white/10 transition-all"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
                <label className="block text-xs font-medium text-[#86868b] uppercase tracking-wider">
                    Message <span className="text-red-400">*</span>
                </label>
                <textarea
                    ref={textareaRef}
                    value={newComment}
                    maxLength={200}
                    onChange={handleTextareaChange}
                    placeholder="Write your message here..."
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-[#f5f5f7] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0071E3]/60 focus:bg-white/10 transition-all resize-none min-h-[100px]"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
                <label className="block text-xs font-medium text-[#86868b] uppercase tracking-wider">
                    Profile Photo <span className="text-[#86868b]/60">(optional)</span>
                </label>
                <div className="flex items-center gap-4 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                    {imagePreview ? (
                        <div className="flex items-center gap-4 w-full justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="w-12 h-12 rounded-full object-cover border border-[#0071E3]"
                                />
                                <span className="text-xs text-[#f5f5f7] font-medium">Photo attached</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-xs"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Remove</span>
                            </button>
                        </div>
                    ) : (
                        <div className="w-full">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-[#0071E3] hover:bg-white/10 transition-all border border-dashed border-white/20 hover:border-white/40 group text-xs font-medium"
                            >
                                <ImagePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Choose Profile Photo (Max 5MB)</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                data-aos="fade-up" data-aos-duration="1000"
                className="w-full h-12 bg-[#0071E3] hover:bg-[#0077ED] rounded-full font-medium text-white transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_rgba(0,113,227,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Posting...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        <span>Post Comment</span>
                    </>
                )}
            </button>
        </form>
    );
});

const Komentar = () => {
    const [comments, setComments] = useState([]);
    const [pinnedComment, setPinnedComment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({
            once: false,
            duration: 1000,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
    }, []);

    useEffect(() => {
        const fetchPinnedComment = async () => {
            try {
                const { data, error } = await supabase
                    .from('portfolio_comments')
                    .select('*')
                    .eq('is_pinned', true)
                    .limit(1)
                    .maybeSingle();
                
                if (error) {
                    console.error('Error fetching pinned comment:', error);
                    return;
                }
                
                if (data) {
                    setPinnedComment(data);
                } else {
                    setPinnedComment(null);
                }
            } catch (error) {
                console.error('Error fetching pinned comment:', error);
            }
        };

        fetchPinnedComment();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('portfolio_comments')
                .select('*')
                .eq('is_pinned', false)
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error fetching comments:', error);
                return;
            }
            
            setComments(data || []);
        };

        fetchComments();

        const subscription = supabase
            .channel('portfolio_comments')
            .on('postgres_changes', 
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'portfolio_comments',
                    filter: 'is_pinned=eq.false'
                }, 
                () => {
                    fetchComments();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const uploadImage = useCallback(async (imageFile) => {
        if (!imageFile) return null;
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `profile-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('profile-images')
            .upload(filePath, imageFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('profile-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }) => {
        setError('');
        setIsSubmitting(true);
        
        try {
            const profileImageUrl = await uploadImage(imageFile);
            
            const { error } = await supabase
                .from('portfolio_comments')
                .insert([
                    {
                        content: newComment,
                        user_name: userName,
                        profile_image: profileImageUrl,
                        is_pinned: false,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) {
                throw error;
            }
        } catch (error) {
            setError('Failed to post comment. Please try again.');
            console.error('Error adding comment: ', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [uploadImage]);

    const formatDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }, []);

    const totalComments = comments.length + (pinnedComment ? 1 : 0);

    return (
        <div className="w-full bg-transparent text-[#f5f5f7] font-sans" data-aos="fade-up" data-aos-duration="1000">
            <div className="pb-6 border-b border-white/10 flex items-center justify-between" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#0071E3]">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-[#f5f5f7]">
                        Discussion <span className="text-[#86868b] font-normal text-base">({totalComments})</span>
                    </h3>
                </div>
            </div>

            <div className="pt-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm" data-aos="fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
                
                <div>
                    <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />
                </div>

                <div className="space-y-4 max-h-[350px] overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 pt-1" data-aos="fade-up" data-aos-delay="200">
                    {pinnedComment && (
                        <div data-aos="fade-down" data-aos-duration="800">
                            <Comment 
                                comment={pinnedComment} 
                                formatDate={formatDate}
                                index={0}
                                isPinned={true}
                            />
                        </div>
                    )}
                    
                    {comments.length === 0 && !pinnedComment ? (
                        <div className="text-center py-12" data-aos="fade-in">
                            <UserCircle2 className="w-12 h-12 text-[#86868b] mx-auto mb-3 opacity-40" />
                            <p className="text-[#86868b] text-sm">No comments yet. Start the conversation!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <Comment 
                                key={comment.id} 
                                comment={comment} 
                                formatDate={formatDate}
                                index={index + (pinnedComment ? 1 : 0)}
                                isPinned={false}
                            />
                        ))
                    )}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default Komentar;