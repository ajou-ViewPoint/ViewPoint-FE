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

export interface WordFishData {
    id: string;
    data: [{ x: number; y: number; party: string }];
}

export interface RAWWordFishData {
    id: number;
    docId: string;
    thetaRaw: number;
    age: number;
    committee: string;
    speakerName: string;
    memberId: number;
    theta: number;
    party: string;
    displayName: string;
    sourceTag: string;
}
