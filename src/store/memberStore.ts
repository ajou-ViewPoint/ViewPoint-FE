import { create } from 'zustand';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';
import type { Member } from '../types/member';

const DEFAULT_PAGINATION: MemberListPagination = {
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 15,
    first: false,
    last: false,
    sortBy: 'age',
    direction: 'desc',
};

export interface memberFilter {
    page: number;
    size: number;
    sortBy: string;
    direction: string;
}

export interface MemberListPagination {
    totalElements: number;
    totalPages: number;
    pageNumber: number; // 현재 페이지 번호(0 베이스)
    pageSize: number;
    first: boolean;
    last: boolean;
    // 정렬 기준
    sortBy: string;
    direction: 'desc' | 'asc';
}
interface memberStore {
    memberList: Member[];
    memberListPagination: MemberListPagination;
    setMemberListPage: (newPageState: MemberListPagination) => void;
    getMemberList: () => Promise<void>;
    getMember: (memberId: number) => Promise<Member>;
}

interface memberFilterStore {
    filterState: memberFilter;
    setFilterState: (state: memberFilter) => void;
}

export const useMemberStore = create<memberStore>((set) => ({
    memberList: [],
    memberListPagination: DEFAULT_PAGINATION,
    setMemberListPage: (newPageState) => set({ memberListPagination: newPageState }),
    getMemberList: async () => {
        try {
            const pageState = useMemberStore.getState().memberListPagination;
            const res = await axios.get(
                `${SERVER_IP}/v1/assemblymembers?page=${pageState.pageNumber}&size=${pageState.pageSize}&sortBy=${pageState.sortBy}&direction=${pageState.direction}`
            );
            set({
                memberList: res.data.content,
                memberListPagination: {
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    pageNumber: res.data.pageable.pageNumber,
                    pageSize: res.data.pageable.pageSize,
                    first: res.data.first,
                    last: res.data.last,
                    sortBy: pageState.sortBy,
                    direction: pageState.direction,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `의원 리스트 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },
    getMember: async (memberId) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/assemblymembers/${memberId}`);
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `의원 정보 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },
}));

export const useMemberFilterStore = create<memberFilterStore>((set) => ({
    filterState: { page: 0, size: 40, sortBy: 'id', direction: 'asc' },
    setFilterState: (prev) => set({ filterState: prev }),
}));
