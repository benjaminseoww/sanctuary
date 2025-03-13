import { createContext, useContext } from 'react';

type HomeContextType = {
  searchBarInput: string;
  setSearchBarInput: (text: string) => void;
};

export const HomeContext = createContext<HomeContextType>({
  searchBarInput: '',
  setSearchBarInput: () => {},
});

export const useHomeContext = () => useContext(HomeContext);