import { create } from 'zustand';
import type { District, DistrictMember } from '../types/district';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';

export const DEFAULT_DISTRICT = {
    regionCd: '',
    electionDistrict: '',
    sidoName: '',
    sggName: '',
};

export const DEFAULT_DISTRICT_MEMBER = {
    memberName: '',
    partyName: '',
    normalizedPartyName: '',
    eraco: '',
    electionDistrict: '',
    sidoName: '',
    sggName: '',
    regionCd: '',
    voteRate: 0,
    memberId: 0,
    profileImage: '',
};

interface MyDistrictStore {
    districtList: District[];
    selectedDistrict: District;
    selectedDistrictMembers: DistrictMember[];
    getAllDistrict: () => Promise<void>;
    getDistrictMembers: (sido?: string, sigungu?: string, regionCd?: string) => Promise<void>;
    getDistrictMembersByCoordinaite: (longitude: number, latitude: number) => Promise<void>;
}

export const useMyDistrictStore = create<MyDistrictStore>((set) => ({
    districtList: [],
    selectedDistrict: DEFAULT_DISTRICT,
    selectedDistrictMembers: [DEFAULT_DISTRICT_MEMBER],
    getAllDistrict: async () => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/constituencies?page=0&size=100&sortBy=constName&direction=asc`
            );
            set({ districtList: res.data.content });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `선거구 리스트 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },

    getDistrictMembers: async (sido?: string, sigungu?: string, regionCd?: string) => {
        try {
            let res;
            if (regionCd) {
                // regionCd가 우선
                res = await axios.get(`${SERVER_IP}/v1/constituencies/by-region?code=${regionCd}`);
            } else if (sido && sigungu) {
                // sido, sigungu 쌍이 모두 있을 때만 요청
                res = await axios.get(
                    `${SERVER_IP}/v1/constituencies/by-region?sido=${sido}&sgg=${sigungu}`
                );
            } else {
                throw new Error('sido/sigungu 또는 regionCd 중 하나는 반드시 필요합니다.');
            }

            // 해당 선거구 의원들과 기본 정보 세팅
            set({
                selectedDistrictMembers: res.data,
                selectedDistrict: {
                    regionCd: res.data[0].regionCd,
                    electionDistrict: res.data[0].electionDistrict,
                    sidoName: res.data[0].sidoName,
                    sggName: res.data[0].sggName,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `선거구 의원 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },

    getDistrictMembersByCoordinaite: async (longitude, latitude) => {
        try {
            const res = await axios.get(
                `${SERVER_IP}/v1/constituencies/by-coords?lon=${longitude}&lat=${latitude}`
            );
            // 해당 선거구 의원들과 기본 정보 세팅
            set({
                selectedDistrictMembers: res.data,
                selectedDistrict: {
                    regionCd: res.data[0].regionCd,
                    electionDistrict: res.data[0].electionDistrict,
                    sidoName: res.data[0].sidoName,
                    sggName: res.data[0].sggName,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `현직 의원 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
            throw error;
        }
    },
}));
