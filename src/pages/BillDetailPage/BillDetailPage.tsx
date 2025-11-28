import { useParams } from 'react-router-dom';
import style from './BillDetailPage.module.scss';
import { DEFAULT_BILL, useBillStore } from '../../store/billStore';
import { useEffect } from 'react';
import BillTag from '../../widgets/tag/BillTag';
import BillProgress from './BillProgress';
import NominateScatterPlot from '../../widgets/NominateScatterPlot';
import VotingGroupsSection from './VotingGroupsSection';
import VoteResultSection from './VoteResultSection';

function BillDetailPage() {
    const params = useParams();
    const bill = useBillStore((state) => state.selectedBill);
    const { getSelectedBill } = useBillStore();

    useEffect(() => {
        if (!bill || bill === DEFAULT_BILL) {
            const fetchBill = async () => {
                await getSelectedBill(params.billId ?? '');
            };
            fetchBill();
        }
    }, [bill, params.billId, getSelectedBill]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={style.pageWrapper}>
            <section className={style.section}>
                <div className={style.wrapper}>
                    <div className={style.header}>
                        <h3 className={style.header__title}>{bill.billTitle}</h3>
                        <p
                            className={`${style.header__result} ${
                                bill.procResultCd?.includes('가결') ? style.pass : style.failed
                            }`}>
                            {bill.procResultCd}
                        </p>
                    </div>
                    <div className={style.header__buttonRail}>
                        {bill.topic?.split(',').map((topic) => (
                            <BillTag tagText={topic} />
                        ))}
                    </div>
                    <hr className={style.divider}></hr>

                    <dl className={style.detail}>
                        <div className={style.detail__item}>
                            <dt>대표발의</dt>
                            <dd>{bill.proposer}</dd>
                        </div>
                        <div className={style.detail__item}>
                            <dt>발의일자</dt>
                            <dd>{bill.proposeDt?.replaceAll('-', '.')}</dd>
                        </div>
                        {/* 처리일자 수정 필요. 날짜 존재하는 필드 중에 가장 나중의 것을 선택하는 로직 필요*/}
                        {/* <div className={style.detail__item}>
                            <dt>처리일자</dt>
                            <dd>어떤 처리일자???</dd>
                        </div> */}
                    </dl>
                </div>
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>심사 진행 단계</h3>
                <div className={style.wrapper}>
                    <BillProgress />
                </div>
            </section>
            <section className={style.section}>
                <VoteResultSection />
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>국회의원 이념공간 beta</h3>
                <div className={style.wrapper__chart}>
                    <NominateScatterPlot />
                </div>
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>의안 내용 요약</h3>
                {bill.billSummary ? (
                    <div className={style.wrapper}>
                        <pre className={style.billSummaryText}>{bill.billSummary}</pre>
                    </div>
                ) : (
                    <div className={style.resultCard}>
                        <dt>의안 내용이 없습니다.</dt>
                    </div>
                )}
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>의원 투표 현황</h3>
                <VotingGroupsSection billId={bill.billId} />
            </section>
        </div>
    );
}

export default BillDetailPage;
