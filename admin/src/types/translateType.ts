export type TranslateStatus = "pending" | "confirm" | "rejected";

export interface User{
  _id:string,
  email:string,
  userName:string

}
export interface TranslateAllResponse {
  message: string;
  data: TranslateAll[];
}
export interface TranslateAll {
  _id: string;
  userId: User;            
  content: string;
  status: TranslateStatus;
  createdAt: string;
  updatedAt: string;
}