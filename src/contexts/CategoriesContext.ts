import { createContext } from "react";

import { Category } from "../hooks/useCategories";

interface CategoriesContextValue {
  categories: Category[] | undefined;
  setCategories: (categories: Category[]) => void;
}

export const CategoriesContext = createContext<CategoriesContextValue>({
  categories: undefined,
  setCategories: () => {},
});

CategoriesContext.displayName = "Categories Context";

export default CategoriesContext;
