import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CreateCommentRequest,
  CommentByStoryId,
  GetCommentParams,
  CreateReplyRequest,
  CreateReplyResponse,
  ReactRequest,
  ReactResponse,
  DeleteRequest,
  DeleteReplyRequest,
  GetCommentByChapterParams,
} from "../../types/commentType";
import {
  createCommentApi,
  getCommentByStoryIdApi,
  createCommentReplyApi,
  reactCommentApi,
  reactReplyApi,
  deleteCommentApi,
  deleteReplyApi,
  getCommentByChapterIdApi,
} from "./commentApi";
import axios from "axios";

export const deleteReply = createAsyncThunk<
  { message: string },
  DeleteReplyRequest,
  { rejectValue: string }
>("comment/deleteReply", async (data, { rejectWithValue }) => {
  try {
    const res = await deleteReplyApi(data);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "React failed");
    }
    return rejectWithValue("React failed");
  }
});
export const deleteComment = createAsyncThunk<
  { message: string },
  DeleteRequest,
  { rejectValue: string }
>("comment/deleteComment", async (data, { rejectWithValue }) => {
  try {
    const res = await deleteCommentApi(data);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "React failed");
    }
    return rejectWithValue("React failed");
  }
});

export const reactReply = createAsyncThunk<
  ReactResponse,
  { data: ReactRequest; commentId: string; replyId: string },
  { rejectValue: string }
>(
  "comment/reactReply",
  async ({ data, commentId, replyId }, { rejectWithValue }) => {
    try {
      return await reactReplyApi(data, commentId, replyId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "React failed");
      }
      return rejectWithValue("React failed");
    }
  }
);

export const reactComment = createAsyncThunk<
  ReactResponse,
  { data: ReactRequest; commentId: string },
  { rejectValue: string }
>("comment/reactComment", async ({ data, commentId }, { rejectWithValue }) => {
  try {
    return await reactCommentApi(data, commentId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "React failed");
    }
    return rejectWithValue("React failed");
  }
});
export const createReply = createAsyncThunk<
  CreateReplyResponse,
  CreateReplyRequest,
  { rejectValue: string }
>("comment/createReply", async (data, { rejectWithValue }) => {
  try {
    return await createCommentReplyApi(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Reply failed");
    }
    return rejectWithValue("Reply failed");
  }
});
export const getCommentByChapterId = createAsyncThunk<
  CommentByStoryId,
  GetCommentByChapterParams,
  { rejectValue: string }
>("comment/getByChapterId", async (params, { rejectWithValue }) => {
  try {
    return await getCommentByChapterIdApi(params);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Get comments failed"
      );
    }
    return rejectWithValue("Get comments failed");
  }
});
export const getCommentByStoryId = createAsyncThunk<
  CommentByStoryId,
  GetCommentParams,
  { rejectValue: string }
>("comment/getByStoryId", async (params, { rejectWithValue }) => {
  try {
    return await getCommentByStoryIdApi(params);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Get comments failed"
      );
    }
    return rejectWithValue("Get comments failed");
  }
});
export const createComment = createAsyncThunk(
  "comment/create",
  async (data: CreateCommentRequest, { rejectWithValue }) => {
    try {
      return await createCommentApi(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("Follow failed");
    }
  }
);
