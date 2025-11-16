export interface Member {
    id: number;
    naasCode: string;
    profileImage: string;
    name: string;
    engName: string;
    chName: string;
    birthDate: string;
    gender: string;
    phone: string;
    eraco: string; // ex '제17대, 제18대, 제19대'
    duty: string; // ex 국회의원
    innerDuty: string | null; // 관리자 지정
    electionDistrict: string; // '비례대표/경기 파주시/경기 파주시을';
    attendanceRate: number | null;
    loyaltyRate: number;
    party: string; //'한나라당/한나라당/새누리당';
    history: string | null;
    committeeId: string | null;
    partyId: string | null;
}

export interface PartyMemberInfoProjection {
    memberId: number;
    name: string;
    constituencyType: string | null;
    profileImage: string | null;
    partyName: string | null;
    duty: string | null;
    regionName: string | null;
}
