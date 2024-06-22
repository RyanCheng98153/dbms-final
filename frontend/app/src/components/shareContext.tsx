// CategoryContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// 定義 Context 的類型
interface CategoryContextType {
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

// 創建 Context，並設置初始值
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

// 創建一個 Provider 組件
const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [category, setCategory] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
