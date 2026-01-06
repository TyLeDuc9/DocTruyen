export type FollowDeleteResponse = {
  message: string;
  storyId: string;
};
export type StoryFollow = {
  _id: string;
  name: string;
  thumbnail: string;
  totalChapters:number
  slug: string;
};

export type Follow = {
  _id: string;
  userId: string;
  storyId: StoryFollow; 
  createdAt: string;
  updatedAt: string;
};

export type FollowMeResponse = {
  follows: Follow[];
};

export type FollowCreateRequest = {
  storyId: string;
};