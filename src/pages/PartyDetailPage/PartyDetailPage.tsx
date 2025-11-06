import { useEffect } from 'react';
import style from './PartyDetailPage.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { usePartyStore } from '../../store/partyStore';
import MemberListCard from '../../features/member/MemberListCard';

const mockSeat = {
    totalSeats: 167,
    proportionalSeats: 14,
    districtSeats: 153,
    seatRatio: '56%',
};

function PartyDetailPage() {
    const param = useParams();
    const party = usePartyStore((state) => state.selectedParty);
    const members = usePartyStore((state) => state.selectedPartyMembers);
    const location = useLocation();
    const { partyName } = location.state || {};
    const { getPartyByID, clearSelectedParty, getSelectedPartyMembers } = usePartyStore();

    useEffect(() => {
        getPartyByID(param.partyId ?? '');
        return () => {
            clearSelectedParty();
            getSelectedPartyMembers(partyName, '제22대');
        };
    }, [getPartyByID, clearSelectedParty, getSelectedPartyMembers, param.partyId, partyName]);
    return (
        <div className={style.pageWrapper}>
            <h1>{party.partyName}</h1>
            <section>
                <h2 className={style.sectionTitle}>의원 이념 분포</h2>
                <div className={style.wrapper}></div>
            </section>
            <section>
                <h2 className={style.sectionTitle}>정당 정보</h2>
                <div className={style.wrapper}></div>
            </section>
            <section className={style.section}>
                <h2 className={style.sectionTitle}>의석 현황</h2>

                <dl className={style.wrapper__grid}>
                    <div className={style.resultCard} data-label="전체 의석수">
                        <dd>{mockSeat.totalSeats}</dd>
                        <dt>전체 의석수</dt>
                    </div>
                    <div className={style.resultCard} data-label="원내 의석수 비율">
                        <dd>{mockSeat.seatRatio}</dd>
                        <dt>원내 의석 점유 비율</dt>
                    </div>
                    <div className={style.resultCard} data-label="지역구 의석수">
                        <dd>{mockSeat.districtSeats}</dd>
                        <dt>지역구 의석수</dt>
                    </div>
                    <div className={style.resultCard} data-label="비례대표 의석수">
                        <dd>{mockSeat.proportionalSeats}</dd>
                        <dt>비례대표 의석수</dt>
                    </div>
                </dl>
            </section>
            <section>
                <h2 className={style.sectionTitle}>구성 의원</h2>
                <div className={style.wrapper__grid}>
                    {members.map((member) => (
                        <MemberListCard key={member.memberId} member={member} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default PartyDetailPage;
