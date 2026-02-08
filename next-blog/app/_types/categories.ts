// Request
export type CreateCategoryRequest = {
  name: string;
};

export type UpdateCategoryRequest = CreateCategoryRequest;

// Response
export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type GetCategoriesResponse = {
  categories: Category[];
};

export type GetCategoryResponse = {
  category: Category | null;
};

export type CreateCategoryResponse = {
  category: Category;
};

export type UpdateCategoryResponse = {
  category: Category;
};
