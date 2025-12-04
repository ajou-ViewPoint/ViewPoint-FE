import { create } from 'zustand';
import axios from 'axios';
import type { bill } from '../types/bill';
import { SERVER_IP } from '../constants/env';
import { useMemberStore } from './memberStore';

export interface billFilter {
    page: number;
    size: number;
    sortBy: string;
    direction: string;
}

export interface BillListPagination {
    totalElements: number;
    totalPages: number;
    pageNumber: number; // 현재 페이지 번호(0 베이스)
    pageSize: number;
    first: boolean;
    last: boolean;
    // 필터링 기준
    keyword?: string;
    start?: string;
    end?: string;
    age?: number;
    party?: string;
    procResultCd?:
        | '대안반영폐기'
        | '부결'
        | '불성립'
        | '수정가결'
        | '수정안반영폐기'
        | '원안가결'
        | '임기만료폐기'
        | '철회';
    // 정렬 기준
    sortBy: string;
    direction: 'desc' | 'asc';
}

const DEFAULT_PAGINATION: BillListPagination = {
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 15,
    first: false,
    last: false,
    sortBy: 'proposeDt',
    direction: 'desc',
};

export const DEFAULT_BILL: bill = {
    id: 0,
    billId: '',
    billTitle: '',
    proposer: null,
    voteTcnt: null,
    yesTcnt: null,
    noTcnt: null,
    blankTcnt: null,
    billSummary: null,
    procResultCd: null,
    committeeSubmitDate: null,
    committeePresentDate: null,
    committeeProcDate: null,
    lawSubmitDate: null,
    lawPresentDate: null,
    lawProcDate: null,
    rgsPresentDate: null,
    rgsProcDate: null,
    proposeDt: null,
    age: null,
    topic: null,
};

interface billStore {
    totalBillNumber: number;
    selectedBill: bill;
    billList: bill[];
    billListPagination: BillListPagination;
    recentBillList: bill[];
    isLoading: boolean;
    setPage: (newPageState: BillListPagination) => void;
    getRecentBillList: () => Promise<void>; // 랜딩페이지
    getBillListByKeyword: (keyword: string) => Promise<void>; // 법안 리스트 페이지 필터 기능
    getBillListByDate: (startDate: string, endDate: string) => Promise<void>; // 법안 리스트 페이지 필터 기능
    getBillList: () => Promise<void>;
    getSelectedBill: (billId: string) => Promise<void>;
    getBill: (billId: string) => Promise<bill>;
}

export const useBillStore = create<billStore>((set) => ({
    totalBillNumber: 0,
    selectedBill: DEFAULT_BILL,
    billList: [],
    billListPagination: DEFAULT_PAGINATION,
    recentBillList: [],
    isLoading: false,
    setPage: (newPageState) => set({ billListPagination: newPageState }),
    getRecentBillList: async () => {
        const { setRandomMembers } = useMemberStore.getState();
        try {
            const res = await axios.get(`${SERVER_IP}/v1/main/home`);
            setRandomMembers(res.data.members);
            set({ recentBillList: res.data.recentBills });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `필터 검색 법안 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
        }
    },
    getBillListByKeyword: async (keyword) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/bills/search?keyword=${keyword}`);
            set({ billList: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `필터 검색 법안 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
        }
    },
    getBillListByDate: async (startDate, endDate) => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/bills/search-by-date?start=${startDate}&end=${endDate}`
            );
            set({ billList: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `필터 검색 법안 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
        }
    },
    getBillList: async () => {
        const paginationState = useBillStore.getState().billListPagination;
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/bills?page=${paginationState?.pageNumber}&size=${paginationState.pageSize}&sortBy=${paginationState.sortBy}&direction=${paginationState.direction}`
            );
            const newPagination = {
                totalElements: res.data.totalElements,
                totalPages: res.data.totalPages,
                pageNumber: res.data.pageable.pageNumber,
                pageSize: res.data.pageable.pageSize,
                first: res.data.first,
                last: res.data.last,
                sortBy: paginationState.sortBy,
                direction: paginationState.direction,
            };
            const prevPagination = useBillStore.getState().billListPagination;
            // 이전 페이지와 다를 때만 set
            if (
                prevPagination.totalElements !== newPagination.totalElements ||
                prevPagination.totalPages !== newPagination.totalPages ||
                prevPagination.pageNumber !== newPagination.pageNumber ||
                prevPagination.pageSize !== newPagination.pageSize ||
                prevPagination.first !== newPagination.first ||
                prevPagination.last !== newPagination.last
            ) {
                set({
                    billList: res.data.content,
                    billListPagination: newPagination,
                });
            } else {
                set({
                    billList: res.data.content,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `법안 리스트 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
        }
    },
    getSelectedBill: async (billId) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/bills/${billId}`);
            set({ selectedBill: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `법안 상세 정보 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
        }
    },
    getBill: async (billId) => {
        const res = await axios.get(`${SERVER_IP}/v1/bills/${billId}`);
        return res.data;
    },
}));

// 의안 필터
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
