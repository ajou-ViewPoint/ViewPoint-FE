interface Committee {
    id: number;
    committeeCode: string;
    activitiesDescription: string;
    scheduleInfo: string;
    committeeName: string;
}

export interface Member {
    memberId: number;
    name: string;
    parties: string[];
    eraco: string[];
    committees: Committee[] | null;
    age: number;
    duty: string;
    profileImage: string;
    electionDistrict: string[] | null;
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

export interface MemberBasic {
    memberId: number;
    name: string;
    party: string;
    age: number;
    duty: string;
    profileImage: string;
    district: string;
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
