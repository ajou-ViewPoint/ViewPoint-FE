import { create } from 'zustand';
import type { Committee } from '../types/committee';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';

const DEFAULT_COMMITTEE = {
    id: 0,
    committeeName: '',
    committeeCode: '',
    activitiesDescription: '',
    scheduleInfo: '',
};

interface committeeStore {
    selectedCommittee: Committee;
    getCommitteeById: (id: string) => Promise<void>;
    clearSelectedCommittee: () => void;
}

export const useCommitteeStore = create<committeeStore>((set) => ({
    selectedCommittee: DEFAULT_COMMITTEE,
    getCommitteeById: async (id) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/committees/${id}`);
            set({ selectedCommittee: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `위원회 정보 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
        }
    },
    clearSelectedCommittee: () => {
        set({ selectedCommittee: DEFAULT_COMMITTEE });
    },
}));
