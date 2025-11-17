import { useLocation, useParams } from 'react-router-dom';
import style from './CommitteeDetailPage.module.scss';
import { useEffect } from 'react';
import Schedule from './Schedule';
import { useCommitteeStore } from '../../store/committeeStore';
import StatsSection from './StatsSection';
import CommitteeMembersSection from './CommitteeMembersSection';

function CommitteeDetailPage() {
    const { getCommitteeById, getCommitteeDetail } = useCommitteeStore();
    const committee = useCommitteeStore((state) => state.selectedCommittee);
    const committeeDetail = useCommitteeStore((state) => state.selectedCommitteeDetail);

    // committee api 수정시 삭제할 부분.
    const { state } = useLocation() as { state: { committeeName: string } };
    const committeeName = state?.committeeName;
    //
    const params = useParams();

    useEffect(() => {
        if (!committee) {
            // 수정 필요, 메모리 날라가면 committeeName 불러올 수 없음
            getCommitteeById(params.committeeId ?? '');
            getCommitteeDetail(committeeName);
        }
    }, [getCommitteeById, getCommitteeDetail, committee, committeeName, params.committeeId]);

    return (
        <div className={style.wrapper}>
            <section className={style.section__first}>
                <div className={style.header}>
                    <h1 className={style.title}>{committee.committeeName}</h1>
                </div>

                <dl className={style.detail}>
                    <div className={style.detail__item}>
                        <dt>위원회 구성</dt>
                        <dd>
                            위원장 {`${committeeDetail.membersByRole['위원장'].length}`}인, 간사{' '}
                            {`${committeeDetail.membersByRole['간사'].length}`}인, 위원{' '}
                            {`${committeeDetail.membersByRole['위원'].length}`}인
                        </dd>
                    </div>
                    <div className={style.detail__item}>
                        <dt>위원장</dt>
                        <dd>
                            {committeeDetail.membersByRole['위원장']?.map((member) => member.name)}
                        </dd>
                    </div>
                </dl>
            </section>
            <div className={style.wrapper__row}>
                <section className={style.section}>
                    <h2 className={style.section__title}>심사 일정</h2>
                    <div className={style.section__wrapper}>
                        <Schedule />
                    </div>
                </section>
                <section className={style.section}>
                    <h2 className={style.section__title}>정당별 의석수</h2>
                    <div className={style.section__statsWrapper}>
                        <StatsSection
                            statsData={committeeDetail.stats}
                            committeeName={committeeDetail.committeeName}
                        />
                    </div>
                </section>
            </div>

            <section className={style.section}>
                <h2 className={style.section__title}>위원회 구성 의원</h2>
                <div className={style.section__wrapper}>
                    <CommitteeMembersSection {...committeeDetail} />
                </div>
            </section>
        </div>
    );
}

export default CommitteeDetailPage;
