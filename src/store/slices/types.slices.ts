export interface ArticlesTypeRequest {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface ArticlesTypeResponse {
  articles: ArticleType[];
  articlesCount: number;
}

export interface ArticleType {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ArticleAuthor;
}

export interface ArticleAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticleTypeRequest {
  slug: string;
}

export interface ArticleTypeResponse {
  article: ArticleType;
}
