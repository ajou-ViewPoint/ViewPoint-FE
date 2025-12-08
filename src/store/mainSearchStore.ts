import { create } from 'zustand';
import type { bill } from '../types/bill';
import type { Committee } from '../types/committee';
import type { Member } from '../types/member';
import { SERVER_IP } from '../constants/env';
import axios from 'axios';

interface SearchResult {
    bills: bill[] | null;
    members: Member[] | null;
    committees: Committee[] | null;
}

interface MainSearchStore {
    searchResult: SearchResult | null;
    searchQuery: string | null;
    setSearchQuery: (query: string) => void;
    getSearchResult: (keyword: string) => Promise<void>;
}

export const useMainSearchStore = create<MainSearchStore>((set) => ({
    searchResult: null,
    searchQuery: null,
    setSearchQuery: (query) => set({ searchQuery: query }),
    getSearchResult: async (keyword) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/main/search?keyword=${keyword}`);
            set({ searchResult: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`검색 에러: ${error.response?.data?.message ?? error.message}`);
            }
            throw error;
        }
    },
}));
