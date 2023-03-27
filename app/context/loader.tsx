'use client';

import { useContext, useState } from 'react';
import * as React from 'react';
import { isLoaderContextType } from '../../types';

export const IsLoaderContext = React.createContext<isLoaderContextType | null>(
  null
);

interface PostsContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const IsLoaderContextProvider = ({
  children,
}: PostsContextProviderProps) => {
  const [isLoader, setIsLoader] = useState(true);

  return (
    <IsLoaderContext.Provider value={{ isLoader, setIsLoader }}>
      {children}
    </IsLoaderContext.Provider>
  );
};

export const useIsLoaderContext = () => useContext(IsLoaderContext);
