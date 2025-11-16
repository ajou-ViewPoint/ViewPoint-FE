export interface District {
    regionCd: string; // 선거구 지역 코드
    electionDistrict: string; // 선거구 이름 ex. 수원시을
    sidoName: string; // 시,도
    sggName: string; // 시,군,구
}

export interface DistrictMember {
    memberName: string;
    partyName: string;
    normalizedPartyName: string;
    eraco: string; // 국회 대수
    electionDistrict: string; // 당선 선거구
    sidoName: string;
    sggName: string;
    regionCd: string;
    voteRate: number;
    memberId: number;
    profileImage: string;
}
