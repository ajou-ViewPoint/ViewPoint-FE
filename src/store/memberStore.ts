import { create } from 'zustand';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';
import type { Member } from '../types/member';

export interface memberFilter {
    page: number;
    size: number;
    sortBy: string;
    direction: string;
}
interface memberStore {
    memberList: Member[];
    getMemberList: () => Promise<void>;
    getMember: (memberId: number) => Promise<Member>;
}

interface memberFilterStore {
    filterState: memberFilter;
    setFilterState: (state: memberFilter) => void;
}

export const useMemberStore = create<memberStore>((set) => ({
    memberList: [],
    getMemberList: async () => {
        try {
            const state = useMemberFilterStore.getState().filterState;
            const res = await axios.get(
                `${SERVER_IP}/v1/assemblymembers?page=${state.page}&size=${state.size}&sortBy=${state.sortBy}&direction=${state.direction}`
            );
            set({ memberList: res.data.content });
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
