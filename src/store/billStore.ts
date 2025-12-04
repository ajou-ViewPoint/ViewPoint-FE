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
    keyword?: string | null;
    start?: string | null;
    end?: string | null;
    age?: number | null;
    party?: string | null;
    procResultCd?:
        | '대안반영폐기'
        | '부결'
        | '불성립'
        | '수정가결'
        | '수정안반영폐기'
        | '원안가결'
        | '임기만료폐기'
        | '철회'
        | null;
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
    keyword: null,
    start: null,
    end: null,
    age: null,
    party: null,
    procResultCd: null,
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
            // 쿼리 생성
            const params: string[] = [];

            // 선택 필터
            if (paginationState.keyword) {
                params.push(`keyword=${encodeURIComponent(paginationState.keyword)}`);
            }
            if (paginationState.start) {
                params.push(`start=${encodeURIComponent(paginationState.start)}`);
            }
            if (paginationState.end) {
                params.push(`end=${encodeURIComponent(paginationState.end)}`);
            }
            if (paginationState.age !== undefined && paginationState.age !== null) {
                params.push(`age=${encodeURIComponent(paginationState.age)}`);
            }
            if (paginationState.party) {
                params.push(`party=${encodeURIComponent(paginationState.party)}`);
            }
            if (paginationState.procResultCd) {
                params.push(`procResultCd=${encodeURIComponent(paginationState.procResultCd)}`);
            }

            // 페이지네이션 (항상 포함)
            params.push(`page=${encodeURIComponent(paginationState.pageNumber)}`);
            params.push(`size=${encodeURIComponent(paginationState.pageSize)}`);
            params.push(`sortBy=${encodeURIComponent(paginationState.sortBy)}`);
            params.push(`direction=${encodeURIComponent(paginationState.direction)}`);

            const query = params.join('&');
            const res = await axios.get(`${SERVER_IP}/v1/bills/filter?${query}`);

            // 에러 처리
            const list: bill[] = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.content)
                ? res.data.content
                : [];

            const newPagination = {
                totalElements: res.data?.totalElements ?? list.length,
                totalPages: res.data?.totalPages ?? 1,
                pageNumber: res.data?.pageable?.pageNumber ?? paginationState.pageNumber,
                pageSize: res.data?.pageable?.pageSize ?? paginationState.pageSize,
                first: res.data?.first ?? true,
                last: res.data?.last ?? true,
                sortBy: paginationState.sortBy,
                direction: paginationState.direction,
                // 선택 필터 반영
                keyword: paginationState.keyword,
                start: paginationState.start,
                end: paginationState.end,
                age: paginationState.age,
                party: paginationState.party,
                procResultCd: paginationState.procResultCd,
            };
            const prevPagination = useBillStore.getState().billListPagination;

            const keysToCompare: (keyof typeof newPagination)[] = [
                'totalElements',
                'totalPages',
                'pageNumber',
                'pageSize',
                'first',
                'last',
                'sortBy',
                'direction',
                'keyword',
                'start',
                'end',
                'age',
                'party',
                'procResultCd',
            ];
            const isChanged = keysToCompare.some(
                (k) =>
                    (prevPagination as BillListPagination)[k] !==
                    (newPagination as BillListPagination)[k]
            );

            if (isChanged) {
                set({
                    billList: list,
                    billListPagination: newPagination,
                    totalBillNumber: newPagination.totalElements,
                });
            } else {
                set({
                    billList: list,
                    totalBillNumber: newPagination.totalElements,
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
