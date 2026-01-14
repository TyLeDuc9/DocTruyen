
export interface DeleteReplyRequest{
  replyId:string;
  commentId:string
}
export interface DeleteRequest{
  commentId:string
}
export interface ReactRequest {
  type: "like" | "dislike";
}
export interface ReactResponse {
  likes: string[];
  dislikes: string[];
}
export interface CreateReplyRequest {
  commentId: string;
  content: string;
}

export interface CreateReplyResponse {
  message: string;
  reply: Reply;
}
export interface GetCommentParams {
  storyId: string;
  page?: number;
  limit?: number;
}
export interface GetCommentByChapterParams {
  chapterId: string;
  page?: number;
  limit?: number;
}
export interface CommentByStoryId {
  page: number;
  limit: number;
  totalPages: number;
  totalComments: number;
  comments: CommentWithUser[];
}

export interface CommentWithUser {
  _id: string;
  userId: {
    _id: string;
    avatarUrl?: string;
    userName?: string;
  };
  storyId?: string | null;
  chapterId?: string | null;
  content: string;
  likes: string[];
  dislikes: string[];
  likesCount?: number;
  dislikesCount?: number;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  storyId?: string;
  chapterId?: string;
  content: string;
  userId: string;
}

export interface CreateCommentResponse {
  message: string;
  comment: CommentWithUser;
}

export interface Reply {
  _id: string;
  userId: {
    _id: string;
    avatarUrl?: string;
    userName?: string;
  };
  content: string;
  likesCount?: number;
  dislikesCount?: number;
  likes: string[];
  dislikes: string[];
  createdAt: string;
}
