import { useEffect } from 'react';
import style from './PartyDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { usePartyStore } from '../../store/partyStore';
import MemberListCard from '../../features/member/MemberListCard';
import NominateScatterPlot from '../../widgets/NominateScatterPlot';

function PartyDetailPage() {
    const param = useParams();
    const party = usePartyStore((state) => state.selectedParty);
    const members = usePartyStore((state) => state.selectedPartyMembers);
    const seatStatus = usePartyStore((state) => state.selectedPartySeatStatus);

    const {
        getPartyByID,
        clearSelectedParty,
        getSelectedPartyMembers,
        getSelectedPartySeatStatus,
    } = usePartyStore();

    useEffect(() => {
        const partyId = Number(param.partyId);
        if (Number(partyId) !== party.id) {
            getPartyByID(partyId ?? '');
            getSelectedPartySeatStatus(partyId ?? '');
        }

        // 여기에 메모리에 데이터 없을 때의 getSelectedPartyMembers 호출 작성
    }, [
        getPartyByID,
        clearSelectedParty,
        getSelectedPartyMembers,
        getSelectedPartySeatStatus,
        param.partyId,
        party.id,
    ]);
    return (
        <div className={style.pageWrapper}>
            <h1>{party.partyName}</h1>
            <section>
                <div className={style.wrapper__chart}>
                    <NominateScatterPlot />
                </div>
            </section>
            <section>
                <h2 className={style.sectionTitle}>정당 정보</h2>
                <div className={style.wrapper}></div>
            </section>
            <section className={style.section}>
                <h2 className={style.sectionTitle}>의석 현황</h2>

                <dl className={style.wrapper__grid4}>
                    <div className={style.resultCard} data-label="전체 의석수">
                        <dd>{seatStatus.totalSeats ? seatStatus.totalSeats : '-'}</dd>
                        <dt>전체 의석수</dt>
                    </div>
                    <div className={style.resultCard} data-label="원내 의석수 비율">
                        <dd>
                            {seatStatus.totalSeats
                                ? ((seatStatus.totalSeats / 300) * 100).toFixed(1) + '%'
                                : '-'}
                        </dd>
                        <dt>원내 의석 비율</dt>
                    </div>
                    <div className={style.resultCard} data-label="지역구 의석수">
                        <dd>-</dd>
                        <dt>지역구 의석수</dt>
                    </div>
                    <div className={style.resultCard} data-label="비례대표 의석수">
                        <dd>-</dd>
                        <dt>비례대표 의석수</dt>
                    </div>
                </dl>
            </section>
            <section>
                <h2 className={style.sectionTitle}>구성 의원</h2>
                <div className={style.wrapper__grid5}>
                    {members?.map((member) => (
                        <MemberListCard key={member.memberId} member={member} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default PartyDetailPage;
