export interface Member {
    memberId: number;
    name: string;
    party: string;
    age: number;
    duty: string;
    profileImage: string;
    district: string;
    engName: string;
    chName: string;
    birthDate: string;
    gender: string;
    phone: string;
    innerDuty: string;
    history: string;
    attendanceRate: number;
    loyaltyRate: number;
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
