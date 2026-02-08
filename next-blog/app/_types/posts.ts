// Request
export type CreatePostRequest = {
  title: string;
  content: string;
  thumbnailImageKey: string;
  categoryId: number;
};

export type UpdatePostRequest = CreatePostRequest;

// Response
export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailImageKey: string;
  createdAt: string;
  updatedAt: string;
};

export type PostWithCategories = Post & {
  postCategories: { categoryId: number }[];
};

export type GetPostsResponse = {
  posts: Post[];
};

export type GetPostResponse = {
  post: PostWithCategories | null;
};

export type CreatePostResponse = {
  post: Post;
};

export type UpdatePostResponse = {
  post: Post;
};
