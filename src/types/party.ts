export interface Party {
    id: number;
    partyName: string;
    foundedDate: string;
    dissolvedDate: string;
}

export interface PartySeatStatus {
    partyName: string;
    partyId: number;
    totalSeats: number;
    eraco: number;
}
