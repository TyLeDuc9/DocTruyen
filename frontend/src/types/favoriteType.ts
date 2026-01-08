export type FavoriteMeResponse = {
  favorites: Favorite[];
};
export type CountFavoriteStory={
  storyId:string,
  totalFavorites:number
}

export type FavoriteDeleteResponse = {
  message: string;
  storyId: string;
};

export type Favorite = {
  _id: string;
  userId: string;
  storyId: StoryFavorite;
  createdAt: string;
  updatedAt: string;
};

export type StoryFavorite = {
  _id: string;
  name: string;
  thumbnail: string;
  totalChapters: number;
  slug: string;
};
export type FavoriteCreateRequest = {
  storyId: string;
};
