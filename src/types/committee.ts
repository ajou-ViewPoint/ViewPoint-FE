export interface Committee {
    id: number;
    committeeCode: string;
    activitiesDescription: string;
    scheduleInfo: string;
    committeeName: string;
}

export interface CommitteeMember {
    memberId: number;
    naasCode: string;
    age: number;
    profileImage: string;
    name: string;
    party: string;
}

export interface CommitteeDetail {
    committeeName: string;
    committeeId: number;
    membersByRole: Record<string, CommitteeMember[]>;
    stats: Record<string, number>;
}
