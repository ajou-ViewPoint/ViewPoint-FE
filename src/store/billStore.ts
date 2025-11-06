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
    recentBillList: bill[];
    isLoading: boolean;
    getBillList: () => Promise<void>;
    getRecentBillList: () => Promise<void>;
    getBill: (billId: number) => Promise<bill>;
}

export const useBillStore = create<billStore>((set) => ({
    billList: [],
    recentBillList: [],
    isLoading: false,
    getBillList: async () => {
        const filterState = useBillFilterStore.getState().filterState;
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/bills?page=${filterState.page}&size=${filterState.size}&sortBy=${filterState.sortBy}&direction=${filterState.direction}`
            );
            set({ billList: res.data.content });
        } catch (error) {
            throw new Error(`법안 불러오기 에러: ${error}`);
        }
    },
    getRecentBillList: async () => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/main/recent-bills`);
            set({ recentBillList: res.data });
        } catch (error) {
            throw new Error(`최근 통과된 법안 불러오기 에러: ${error}`);
        }
    },
    getBill: async (billId) => {
        const res = await axios.get(`${SERVER_IP}/v1/bills/${billId}`);
        return res.data;
    },
}));

interface billFilterStore {
    activeFilter: string;
    filterState: billFilter;
    setActiveFilter: (activeFilter: string) => void;
    setFilterState: (prev: billFilter) => void;
}

export const useBillFilterStore = create<billFilterStore>((set) => ({
    activeFilter: 'billTitle',
    filterState: {
        page: 0,
        size: 50,
        sortBy: 'committeeSubmitDate',
        direction: 'desc',
    },
    setActiveFilter: (newActiveFilter) => set({ activeFilter: newActiveFilter }),
    setFilterState: (prev) => set({ filterState: prev }),
}));
