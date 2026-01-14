import { createSlice } from "@reduxjs/toolkit";
import type { CommentWithUser } from "../../types/commentType";
import {
  createComment,
  getCommentByStoryId,
  getCommentByChapterId,
  createReply,
  reactComment,
  reactReply,
  deleteComment,
  deleteReply,
} from "./commentThunk";

interface CommentState {
  comments: CommentWithUser[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalComments: number;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  totalComments: 0,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // ===== DELETE REPLY =====
      .addCase(deleteReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.loading = false;
        const { commentId, replyId } = action.meta.arg;
        const comment = state.comments.find((c) => c._id === commentId);
        comment!.replies =
          comment?.replies?.filter((r) => r._id !== replyId) || [];
      })
      .addCase(deleteReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định";
      })
      // ===== DELETE COMMENT =====
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (c) => c._id !== action.meta.arg.commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định";
      })
      // ===== REACT REPLY =====
      .addCase(reactReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reactReply.fulfilled, (state, action) => {
        state.loading = false;
        const { likes, dislikes } = action.payload;
        const { commentId, replyId } = action.meta.arg;
        const comment = state.comments.find((c) => c._id === commentId);
        if (!comment) return;
        const reply = comment.replies.find((r) => r._id === replyId);
        if (reply) {
          reply.likes = likes;
          reply.dislikes = dislikes;
          reply.likesCount = likes.length;
          reply.dislikesCount = dislikes.length;
        }
      })
      .addCase(reactReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== REACT COMMENT =====
      .addCase(reactComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reactComment.fulfilled, (state, action) => {
        state.loading = false;
        const { likes, dislikes } = action.payload;
        const { commentId } = action.meta.arg;
        const comment = state.comments.find((c) => c._id === commentId);
        if (comment) {
          comment.likes = likes;
          comment.dislikes = dislikes;
          comment.likesCount = likes.length;
          comment.dislikesCount = dislikes.length;
        }
      })

      .addCase(reactComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== CREATE REPLY =====
      .addCase(createReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.loading = false;
        const { reply } = action.payload;
        const commentId = action.meta.arg.commentId;
        const comment = state.comments.find((c) => c._id === commentId);
        if (comment) {
          comment.replies.push(reply);
        }
      })
      .addCase(createReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
         // ===== GET COMMENTS BY CHAPTER =====
      .addCase(getCommentByChapterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentByChapterId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalComments = action.payload.totalComments;
      })

      .addCase(getCommentByChapterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== GET COMMENTS BY STORY =====
      .addCase(getCommentByStoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentByStoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalComments = action.payload.totalComments;
      })

      .addCase(getCommentByStoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ===== CREATE COMMENT =====
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload.comment);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default commentSlice.reducer;
