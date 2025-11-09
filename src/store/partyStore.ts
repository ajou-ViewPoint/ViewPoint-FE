import { create } from 'zustand';
import type { Party, PartySeatStatus } from '../types/party';
import { SERVER_IP } from '../constants/env';
import axios from 'axios';
import type { PartyMemberInfoProjection } from '../types/member';

const DEFAULT_PARTY = { id: 0, partyName: '', foundedDate: '', dissolvedDate: '' };
const DEFAULT_MEMBER = {
    memberId: 0,
    name: '',
    constituencyType: '',
    profileImage: '',
    partyName: '',
    duty: '',
    regionName: '',
};
const DEFAULT_SEATSTATUS = {
    partyName: '',
    partyId: 0,
    totalSeats: 0,
    eraco: 0,
};

interface PartyStore {
    currentPartyList: Party[];
    allPartyList: Party[];
    selectedParty: Party;
    selectedPartyMembers: PartyMemberInfoProjection[];
    selectedPartySeatStatus: PartySeatStatus;
    clearSelectedParty: () => void;
    getAllPartyList: () => Promise<void>;
    getPartyByID: (id: string) => Promise<void>;
    getSelectedPartyMembers: (partyName: string, term: string) => Promise<void>;
    getSelectedPartySeatStatus: (id: string) => Promise<void>;
}

export const usePartyStore = create<PartyStore>((set) => ({
    currentPartyList: [],
    allPartyList: [],
    selectedParty: DEFAULT_PARTY,
    selectedPartyMembers: [DEFAULT_MEMBER],
    selectedPartySeatStatus: DEFAULT_SEATSTATUS,
    clearSelectedParty: () => {
        set({ selectedParty: DEFAULT_PARTY });
    },
    getAllPartyList: async () => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/parties?page=0&size=200&sortBy=foundedDate&direction=desc`
            );
            set({ allPartyList: res.data.content });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `정당 리스트 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },
    getPartyByID: async (id) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/parties/${id}`);
            set({ selectedParty: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `정당 기본 정보 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
            throw error;
        }
    },
    getSelectedPartyMembers: async (partyName, term) => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/parties/members?partyName=${partyName}&eraco=${term}`
            );
            set({ selectedPartyMembers: res.data.members });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `정당 기본 정보 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
            throw error;
        }
    },
    getSelectedPartySeatStatus: async (id) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/parties/seats?eraco=제22대`);
            const selectedPartySeat = res.data.partySeatStats.find(
                (seat: PartySeatStatus) => seat.partyId === Number(id)
            );
            set({ selectedPartySeatStatus: selectedPartySeat ?? DEFAULT_SEATSTATUS });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `정당 의석 정보 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
            throw error;
        }
    },
}));
