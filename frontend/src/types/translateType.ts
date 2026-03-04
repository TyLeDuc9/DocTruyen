export type TranslateStatus = "pending" | "confirm" | "rejected";

export interface CreateTranslatePayload {
  content: string;
}

export interface Translate {
  _id: string;
  content: string;
  status: TranslateStatus;
  createdAt: string;
  updatedAt:string
}