'use client';

import { useContext, useState } from 'react';
import * as React from 'react';
import { isLoaderContextType } from '../../types';
import { MotionValue } from 'framer-motion';

interface scrollYContextType {
  scrollYContext: MotionValue<number> | null;
  setScrollYContext: React.Dispatch<
    React.SetStateAction<MotionValue<number> | null>
  >;
}

export const ScrollYContext = React.createContext<scrollYContextType | null>(
  null
);

interface PostsContextProviderProps {
  children: React.ReactNode | undefined;
}

export const ScrollYContextProvider = ({
  children,
}: PostsContextProviderProps) => {
  const [scrollYContext, setScrollYContext] =
    useState<MotionValue<number> | null>(null);

  return (
    <ScrollYContext.Provider value={{ scrollYContext, setScrollYContext }}>
      {children}
    </ScrollYContext.Provider>
  );
};

export const useScrollYContext = () => useContext(ScrollYContext);
