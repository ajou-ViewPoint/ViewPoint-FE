import { useParams } from 'react-router-dom';
import style from './CommitteeDetailPage.module.scss';
import { useEffect } from 'react';
import Schedule from './Schedule';
import { useCommitteeStore } from '../../store/committeeStore';
import StatsSection from './StatsSection';
import CommitteeMembersSection from './CommitteeMembersSection';
import WordFishChart from './WordFishChart';

function CommitteeDetailPage() {
    const { getCommitteeById, getCommitteeDetail, getWordFishData } = useCommitteeStore();
    const committee = useCommitteeStore((state) => state.selectedCommittee);
    const committeeDetail = useCommitteeStore((state) => state.selectedCommitteeDetail);
    const params = useParams();

    useEffect(() => {
        const id = Number(params.committeeId);

        if (committee?.id !== id || committeeDetail?.committeeId !== id) {
            getCommitteeById(id);
            getCommitteeDetail(id);
            getWordFishData(id);
        }
    }, [
        committee,
        committeeDetail,
        getCommitteeById,
        getCommitteeDetail,
        getWordFishData,
        params.committeeId,
    ]);

    return (
        <div className={style.wrapper}>
            <section className={style.section__first}>
                <div className={style.header}>
                    <h1 className={style.title}>{committee?.committeeName}</h1>
                </div>

                <dl className={style.detail}>
                    <div className={style.detail__item}>
                        <dt>위원회 구성</dt>
                        <dd>
                            위원장 {`${committeeDetail?.membersByRole?.['위원장']?.length ?? 0}`}인,
                            간사 {`${committeeDetail?.membersByRole?.['간사']?.length ?? 0}`}인,
                            위원 {`${committeeDetail?.membersByRole?.['위원']?.length ?? 0}`}인
                        </dd>
                    </div>
                    <div className={style.detail__item}>
                        <dt>위원장</dt>
                        <dd>
                            {committeeDetail?.membersByRole?.['위원장']?.map(
                                (member) => member.name
                            )}
                        </dd>
                    </div>
                </dl>
            </section>
            <section className={style.section}>
                <h2 className={style.section__title}>위원회 내 이념거리</h2>
                <div className={style.wrapper__chart}>
                    <WordFishChart />
                </div>
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
                            statsData={committeeDetail?.stats}
                            committeeName={committeeDetail?.committeeName}
                        />
                    </div>
                </section>
            </div>

            <section className={style.section}>
                <h2 className={style.section__title}>위원회 구성 의원</h2>
                <div className={style.section__wrapper}>
                    <CommitteeMembersSection {...(committeeDetail ?? {})} />
                </div>
            </section>
        </div>
    );
}

export default CommitteeDetailPage;
