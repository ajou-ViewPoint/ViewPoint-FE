export interface District {
    regionCd: string; // 선거구 지역 코드
    electionDistrict: string; // 선거구 이름 ex. 수원시을
    sidoName: string; // 시,도
    sggName: string; // 시,군,구
}

export interface DistrictMember {
    memberId: number;
    name: string;
    party: string;
    age: number;
    duty: string;
    profileImage: string;
    district: string;
    sidoName: string;
    sggName: string;
    regionCd: string;
    voteRate: number;
}
