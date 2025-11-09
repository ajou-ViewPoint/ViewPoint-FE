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
    getRecentBillList: () => Promise<void>; // 랜딩페이지
    getBillListByKeyword: (keyword: string) => Promise<void>; // 법안 리스트 페이지 필터 기능
    getBillListByDate: (startDate: string, endDate: string) => Promise<void>; // 법안 리스트 페이지 필터 기능
    getBillList: () => Promise<void>;
    getBill: (billId: number) => Promise<bill>;
}

export const useBillStore = create<billStore>((set) => ({
    billList: [],
    recentBillList: [],
    isLoading: false,
    getRecentBillList: async () => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/main/home`);
            set({ recentBillList: res.data.recentBills });
        } catch (error) {
            throw new Error(`최근 통과된 법안 불러오기 에러: ${error}`);
        }
    },
    getBillListByKeyword: async (keyword) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/bills/search?keyword=${keyword}`);
            set({ billList: res.data });
        } catch (error) {
            throw new Error(`필터 검색 법안 불러오기 에러: ${error}`);
        }
    },
    getBillListByDate: async (startDate, endDate) => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/bills/search-by-date?start=${startDate}&end=${endDate}`
            );
            set({ billList: res.data });
        } catch (error) {
            throw new Error(`필터 검색 법안 불러오기 에러: ${error}`);
        }
    },
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
