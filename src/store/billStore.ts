import { create } from 'zustand';
import axios from 'axios';
import type { bill } from '../types/bill';
import { SERVER_IP } from '../constants/env';

export interface billFilter {
    page: number;
    size: number;
    sortBy: string;
    direction: string;
}

interface billStore {
    billList: bill[];
    isLoading: boolean;
    getBillList: () => Promise<void>;
}

interface billFilterStore {
    filterState: billFilter;
    setFilterState: (prev: billFilter) => void;
}

export const useBillStore = create<billStore>((set) => ({
    billList: [],
    isLoading: false,
    getBillList: async () => {
        const filterState = useBillFilterStore.getState().filterState;
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/bills?page=${filterState.page}&size=${filterState.size}&sortBy=${filterState.sortBy}&direction=${filterState.direction}`
            );
            set({ billList: res.data });
        } catch (error) {
            throw new Error(`법안 불러오기 에러: ${error}`);
        }
    },
}));

export const useBillFilterStore = create<billFilterStore>((set) => ({
    filterState: {
        page: 0,
        size: 50,
        sortBy: 'committeeSubmitDate',
        direction: 'desc',
    },
    setFilterState: (prev) => set({ filterState: prev }),
}));
