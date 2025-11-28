export interface bill {
    id: number;
    billId: string;
    billTitle: string;
    proposer?: string | null;
    voteTcnt?: number | null;
    yesTcnt?: number | null;
    noTcnt?: number | null;
    blankTcnt?: number | null;
    billSummary?: string | null;
    procResultCd?: string | null;
    committeeSubmitDate?: string | null;
    committeePresentDate?: string | null;
    committeeProcDate?: string | null;
    lawSubmitDate?: string | null;
    lawPresentDate?: string | null;
    lawProcDate?: string | null;
    rgsPresentDate?: string | null;
    rgsProcDate?: string | null;
    proposeDt?: string | null;
    age?: number | null;
    topic: string | null;
}
