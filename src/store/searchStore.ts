import { create } from 'zustand';

interface searchStore {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const useSearchStore = create<searchStore>((set) => ({
    searchQuery: '',
    setSearchQuery: (query) => {
        set({ searchQuery: query });
    },
}));

export default useSearchStore;
