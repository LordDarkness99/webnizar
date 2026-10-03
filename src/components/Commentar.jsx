import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from "lucide-react";
import { supabase } from "../supabase";

const Comment = memo(({ comment, formatDate, isPinned = false }) => (
  <div
    className={`p-4 rounded-2xl border transition-all duration-300 group hover:shadow-md ${
      isPinned
        ? "bg-[#0071E3]/10 border-[#0071E3]/30"
        : "bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/10 hover:border-black/[0.12] dark:hover:border-white/20"
    }`}
  >
    {isPinned && (
      <div className="flex items-center gap-1.5 mb-2.5 text-[#0071E3]">
        <Pin className="w-3.5 h-3.5" />
        <span className="text-[11px] font-bold uppercase tracking-wider">
          Pinned Announcement
        </span>
      </div>
    )}
    <div className="flex items-start gap-3">
      {comment.profile_image ? (
        <img
          src={comment.profile_image}
          alt={`${comment.user_name}'s profile`}
          className="w-9 h-9 rounded-full object-cover border border-black/10 dark:border-white/10 flex-shrink-0"
          loading="lazy"
        />
      ) : (
        <div
          className={`p-2 rounded-full flex-shrink-0 ${
            isPinned
              ? "bg-[#0071E3]/20 text-[#0071E3]"
              : "bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400"
          }`}
        >
          <UserCircle2 className="w-5 h-5" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2 truncate">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-[#f5f5f7] truncate">
              {comment.user_name}
            </h4>
            {isPinned && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#0071E3] text-white rounded-full">
                Admin
              </span>
            )}
          </div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm break-words leading-relaxed font-normal">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB. Please choose a smaller image.");
        if (e.target) e.target.value = "";
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        if (e.target) e.target.value = "";
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
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const removeImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    onSubmit({ newComment, userName, imageFile });
    setNewComment("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Your display name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={isSubmitting}
        className="w-full p-3 px-4 bg-black/[0.03] dark:bg-white/5 rounded-2xl border border-black/[0.08] dark:border-white/10 placeholder-gray-400 text-gray-900 dark:text-[#f5f5f7] text-sm focus:outline-none focus:border-[#0071E3] transition-all"
        required
      />

      <div className="relative rounded-2xl border border-black/[0.08] dark:border-white/10 bg-black/[0.03] dark:bg-white/5 overflow-hidden focus-within:border-[#0071E3] transition-all">
        <textarea
          ref={textareaRef}
          rows="2"
          placeholder="Share your thoughts or leave feedback..."
          value={newComment}
          onChange={handleTextareaChange}
          disabled={isSubmitting}
          className="w-full p-3 px-4 bg-transparent placeholder-gray-400 text-gray-900 dark:text-[#f5f5f7] text-sm resize-none focus:outline-none"
          required
        />

        {imagePreview && (
          <div className="p-3 pt-0 flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute inset-0 bg-black/50 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="p-2.5 px-3 border-t border-black/[0.05] dark:border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0071E3] transition-colors"
          >
            <ImagePlus className="w-4 h-4" />
            <span>Add Avatar</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim() || !userName.trim()}
            className="px-4 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
});

const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [pinnedComment, setPinnedComment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPinnedComment = async () => {
      try {
        const { data, error } = await supabase
          .from("portfolio_comments")
          .select("*")
          .eq("is_pinned", true)
          .limit(1)
          .maybeSingle();

        if (error) return;
        if (data) setPinnedComment(data);
      } catch (err) {
        // silently fallback
      }
    };

    fetchPinnedComment();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("portfolio_comments")
        .select("*")
        .eq("is_pinned", false)
        .order("created_at", { ascending: false });

      if (error) return;
      setComments(data || []);
    };

    fetchComments();

    const subscription = supabase
      .channel("portfolio_comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "portfolio_comments",
          filter: "is_pinned=eq.false",
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
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }, []);

  const handleCommentSubmit = useCallback(
    async ({ newComment, userName, imageFile }) => {
      setError("");
      setIsSubmitting(true);

      try {
        const profileImageUrl = await uploadImage(imageFile);

        const { error } = await supabase.from("portfolio_comments").insert([
          {
            content: newComment,
            user_name: userName,
            profile_image: profileImageUrl,
            is_pinned: false,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
      } catch (err) {
        setError("Failed to post comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [uploadImage]
  );

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }, []);

  const totalComments = comments.length + (pinnedComment ? 1 : 0);

  return (
    <div className="w-full text-gray-900 dark:text-[#f5f5f7] font-sans">
      <div className="pb-5 border-b border-black/[0.06] dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-[#0071E3]/10 dark:bg-white/10 text-[#0071E3]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#f5f5f7]">
              Community Discussion
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {totalComments} {totalComments === 1 ? "thought" : "thoughts"} shared
            </span>
          </div>
        </div>
      </div>

      <div className="pt-5 space-y-5">
        {error && (
          <div className="flex items-center gap-2 p-3 text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <CommentForm
          onSubmit={handleCommentSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {pinnedComment && (
            <Comment
              comment={pinnedComment}
              formatDate={formatDate}
              isPinned={true}
            />
          )}

          {comments.length === 0 && !pinnedComment ? (
            <div className="text-center py-10">
              <UserCircle2 className="w-10 h-10 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-gray-500 text-xs">
                No comments yet. Be the first to start the conversation!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                formatDate={formatDate}
                isPinned={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Komentar;