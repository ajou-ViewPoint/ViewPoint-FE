import { create } from 'zustand';
import type { ScatterPlotDatum, ScatterPlotRawSerie } from '../types/nivo-scatterplot';
import axios from 'axios';
import { SERVER_IP } from '../constants/env';

interface NominateStore {
    nominateData: ScatterPlotRawSerie<ScatterPlotDatum>[];
    nominateAge: number;
    setNominateAge: (age: number) => void;
    getNominateDataByAge: () => Promise<void>;
}

export const useNominateStore = create<NominateStore>((set, get) => ({
    nominateData: [],
    nominateAge: 22,
    setNominateAge: (age) => set({ nominateAge: age }),
    getNominateDataByAge: async () => {
        try {
            const age = get().nominateAge;
            const res = await axios.get(`${SERVER_IP}/v1/nominate?age=${age}`);
            set({ nominateData: res.data, nominateAge: age });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `NOMINATE 데이터 불러오기 에러: ${
                        error.response?.data?.message ?? error.message
                    }`
                );
            }
            throw error;
        }
    },
}));
