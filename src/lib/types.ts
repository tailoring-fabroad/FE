export interface Request {
    title?: string;
    list?: string;
    genre_id?: number;
    page?: string | number;
  }
  
export interface Response<T = any> {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: T;
    total_pages: number;
    total_results: number;
}

export type Article = {
  createdAt: string;
  updatedAt: string;
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  image: string;
  tag_list: string[];
  author: Author;
  favorited: boolean;
  favoritesCount: number;
};

export type Author = {
  username: string;
  bio: string;
  image: string | null;
  following: boolean;
};

export type Rating = {
	rate: number;
	count: number;
};

export type FeedResponse = {
  code: number;
  message: string;
  data: {
    articles: Article[];
    articlesCount: number;
  };
};

