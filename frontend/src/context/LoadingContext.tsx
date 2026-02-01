import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  componentsLoading: boolean;
  setComponentsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [componentsLoading, setComponentsLoading] =
    useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        componentsLoading,
        setComponentsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};


export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};
