import { create } from 'zustand';
import type { Committee, CommitteeDetail, RAWWordFishData, WordFishData } from '../types/committee';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';

const DEFAULT_COMMITTEE = {
    id: 0,
    committeeName: '',
    committeeCode: '',
    activitiesDescription: '',
    scheduleInfo: '',
};

const DEFAULT_COMMITTEEDETAIL: CommitteeDetail = {
    committeeId: 0,
    committeeName: '',
    membersByRole: {},
    stats: {},
};

function convertWordFishData(rawList: RAWWordFishData[]) {
    return rawList.map((item) => ({
        id: item.speakerName,
        data: [
            {
                x: item.theta,
                y: 0,
                party: item.party,
            },
        ] as [{ x: number; y: number; party: string }],
    }));
}

interface committeeStore {
    selectedCommittee: Committee;
    selectedCommitteeDetail: CommitteeDetail;
    wordFishData: WordFishData[];
    getCommitteeById: (committeeId: number) => Promise<void>;
    getCommitteeDetail: (committeeId: number) => Promise<void>;
    getWordFishData: (committeeId: number) => Promise<void>;
}

export const useCommitteeStore = create<committeeStore>((set) => ({
    selectedCommittee: DEFAULT_COMMITTEE,
    selectedCommitteeDetail: DEFAULT_COMMITTEEDETAIL,
    wordFishData: [],
    getWordFishData: async (committeeId) => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/wordfish?committeeId=${committeeId}&age=22`
            );
            const converted = convertWordFishData(res.data);
            set({ wordFishData: converted });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `워드피쉬 정보 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
        }
    },
    getCommitteeById: async (committeeId) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/committees/${committeeId}`);
            set({ selectedCommittee: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `위원회 정보 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
        }
    },
    getCommitteeDetail: async (committeeId) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/committees/detail?id=${committeeId}`);
            set({ selectedCommitteeDetail: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `위원회 상세 정보 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
        }
    },
}));
