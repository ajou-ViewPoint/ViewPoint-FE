import { create } from 'zustand';
import { SERVER_IP } from '../constants/env';
import axios from 'axios';

export interface VoteResultCount {
    agreeCount: number;
    disagreeCount: number;
    abstainCount: number;
    absentCount: number;
    totalCount: number;
}

export interface VoteMember {
    id: number;
    name: string;
    party: string;
    age: number;
    duty: string;
    profileImage: string;
}

export interface VoteResultMember {
    [key: string]: VoteMember[];
}

const DEFAULT_VOTE_RESULT_COUNT: VoteResultCount = {
    agreeCount: 0,
    disagreeCount: 0,
    abstainCount: 0,
    absentCount: 0,
    totalCount: 0,
};

const DEFAULT_VOTE_RESULT_MEMBER: VoteResultMember = {
    agree: [],
    disagree: [],
    abstain: [],
    absent: [],
};

interface BillVoteResultStore {
    voteResultCount: VoteResultCount;
    voteResultMember: VoteResultMember;
    /**billId는 ARC_xxx 형식입니다 */
    getVoteResult: (billId: string) => Promise<void>;
}

const useBillVoteResultStore = create<BillVoteResultStore>((set) => ({
    voteResultCount: DEFAULT_VOTE_RESULT_COUNT,
    voteResultMember: DEFAULT_VOTE_RESULT_MEMBER,
    getVoteResult: async (billId) => {
        try {
            const res = await axios.get(`${SERVER_IP}/v1/bills/${billId}/votes`);
            set({
                voteResultCount: {
                    agreeCount: res.data.agreeCount,
                    disagreeCount: res.data.disagreeCount,
                    abstainCount: res.data.abstainCount,
                    absentCount: res.data.absentCount,
                    totalCount: res.data.totalCount,
                },
                voteResultMember: {
                    agree: res.data.agree,
                    disagree: res.data.disagree,
                    abstain: res.data.abstain,
                    absent: res.data.absent,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `투표 결과 불러오기 에러: ${error.response?.data?.message ?? error.message}`
                );
            }
        }
    },
}));

export default useBillVoteResultStore;
