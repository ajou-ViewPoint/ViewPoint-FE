import { create } from 'zustand';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';
import type { Member } from '../types/member';

const DEFAULT_PAGINATION: MemberListPagination = {
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 35,
    first: false,
    last: false,
    sortBy: 'age',
    direction: 'desc',
    keyword: '',
    eraco: '',
    party: '',
};

const DEFAULT_VOTERECORD_PAGINATION: VoteRecordPagiantion = {
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 40,
    first: false,
    last: false,
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
    // 선택 필터
    keyword?: string;
    eraco?: string;
    party?: string;
}

export interface VoteRecordPagiantion {
    totalElements: number;
    totalPages: number;
    pageNumber: number; // 현재 페이지 번호(0 베이스)
    pageSize: number;
    first: boolean;
    last: boolean;
}

interface MemberVoteRecord {
    billId: string;
    voteDate: string;
    billTitle: string;
    voteOpinion: string;
}
interface memberStore {
    memberList: Member[];
    memberVoteRecord: MemberVoteRecord[];
    randomMemberList: Member[];
    voteRecordPagination: VoteRecordPagiantion;
    memberListPagination: MemberListPagination;
    setVoteRecordPage: (newPageState: VoteRecordPagiantion) => void;
    setRandomMembers: (members: Member[]) => void;
    getRandomMember: () => Promise<void>;
    getMemberVoteRecord: (memberId: string) => Promise<void>;
    setMemberListPage: (newPageState: MemberListPagination) => void;
    getMemberList: () => Promise<void>;
    getMember: (memberId: number) => Promise<Member>;
}

// home 화면 무작위 의원 객체 출력 다시 구현해야함
interface memberFilterStore {
    filterState: memberFilter;
    setFilterState: (state: memberFilter) => void;
}

export const useMemberStore = create<memberStore>((set) => ({
    memberList: [],
    memberVoteRecord: [],
    randomMemberList: [],
    memberListPagination: DEFAULT_PAGINATION,
    voteRecordPagination: DEFAULT_VOTERECORD_PAGINATION,
    setVoteRecordPage: (newPageState) => set({ voteRecordPagination: newPageState }),
    setRandomMembers: (members) => set({ randomMemberList: members }),
    setMemberListPage: (newPageState) => set({ memberListPagination: newPageState }),
    getRandomMember: async () => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/main/home`);
            set({ randomMemberList: res.data.members });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `의원 정보 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },
    getMemberVoteRecord: async (memberId) => {
        try {
            const pageState = useMemberStore.getState().voteRecordPagination;
            const res = await axios.get(
                `${SERVER_IP}/v1/assemblymembers/${memberId}/votes?page=${pageState.pageNumber}&size=${pageState.pageSize}`
            );
            const newPagination = {
                totalElements: res.data.totalElements,
                totalPages: res.data.totalPages,
                pageNumber: res.data.pageable.pageNumber,
                pageSize: res.data.pageable.pageSize,
                first: res.data.first,
                last: res.data.last,
            };
            const prevPagination = useMemberStore.getState().voteRecordPagination;
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
                    memberVoteRecord: res.data.content,
                    voteRecordPagination: newPagination,
                });
            } else {
                set({
                    memberVoteRecord: res.data.content,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `의원 리스트 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },
    getMemberList: async () => {
        try {
            const paginationState = useMemberStore.getState().memberListPagination;
            // 쿼리
            const params: string[] = [];

            // 필터 (선택)
            if (paginationState.keyword) {
                params.push(`keyword=${encodeURIComponent(paginationState.keyword)}`);
            }
            if (
                paginationState.eraco !== '' &&
                paginationState.eraco !== 'undefined' &&
                paginationState.eraco !== null &&
                paginationState.eraco !== undefined
            ) {
                params.push(`eraco=${encodeURIComponent(paginationState.eraco)}`);
            }
            if (paginationState.party) {
                params.push(`party=${encodeURIComponent(paginationState.party)}`);
            }

            // 페이지네이션 (항상 포함)
            params.push(`page=${encodeURIComponent(paginationState.pageNumber)}`);
            params.push(`size=${encodeURIComponent(paginationState.pageSize)}`);
            params.push(`sortBy=${encodeURIComponent(paginationState.sortBy)}`);
            params.push(`direction=${encodeURIComponent(paginationState.direction)}`);

            const query = params.join('&');
            const res = await axios.get(`${SERVER_IP}/v1/assemblymembers/filter?${query}`);

            const newPagination = {
                totalElements: res.data?.totalElements ?? paginationState.totalElements,
                totalPages: res.data?.totalPages ?? paginationState.totalPages,
                pageNumber: res.data?.pageable?.pageNumber ?? paginationState.pageNumber,
                pageSize: res.data?.pageable?.pageSize ?? paginationState.pageSize,
                first: res.data?.first ?? paginationState.first,
                last: res.data?.last ?? paginationState.last,
                sortBy: paginationState.sortBy,
                direction: paginationState.direction,
                keyword: paginationState.keyword,
                eraco: paginationState.eraco,
                party: paginationState.party,
            };
            const prevPagination = useMemberStore.getState().memberListPagination;

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
                'eraco',
                'party',
            ];
            const isChanged = keysToCompare.some(
                (k) =>
                    (prevPagination as MemberListPagination)[k] !==
                    (newPagination as MemberListPagination)[k]
            );

            if (isChanged) {
                set({
                    memberList: res.data?.content ?? [],
                    memberListPagination: newPagination,
                });
            } else {
                set({
                    memberList: res.data?.content ?? [],
                });
            }
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
