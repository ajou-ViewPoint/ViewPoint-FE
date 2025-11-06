import { useLocation, useParams } from 'react-router-dom';
import style from './BillDetailPage.module.scss';
import type { bill } from '../../types/bill';
import { useBillStore } from '../../store/billStore';
import { useEffect, useState } from 'react';
import BillTag from '../../widgets/BillTag';

function BillDetailPage() {
    const { state } = useLocation() as { state: bill };
    const params = useParams();
    const { getBill } = useBillStore();
    const [bill, setBill] = useState<bill | null>(state ?? null);

    useEffect(() => {
        if (!bill && params.billId) {
            const numericBillId = Number(params.billId);
            const fetchBill = async () => {
                const res = await getBill(numericBillId);
                setBill(res);
            };
            fetchBill();
        }
    }, [bill, params.billId, getBill]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!bill) return <div>Loading...</div>;

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
                        <BillTag text="노동" />
                        <BillTag text="부동산" />
                        <BillTag text="청년" />
                    </div>
                    <hr className={style.divider}></hr>

                    <dl className={style.detail}>
                        <div className={style.detail__item}>
                            <dt>대표발의</dt>
                            <dd>{bill.proposer}</dd>
                        </div>
                        {/* 발의 일자 수정 필요 */}
                        <div className={style.detail__item}>
                            <dt>발의일자</dt>
                            <dd>{bill.lawSubmitDate}</dd>
                        </div>
                        {/* 처리일자 수정 필요. 날짜 존재하는 필드 중에 가장 나중의 것을 선택하는 로직 필요*/}
                        <div className={style.detail__item}>
                            <dt>처리일자</dt>
                            <dd>어떤 처리일자???</dd>
                        </div>
                    </dl>
                </div>
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>심사 진행 단계</h3>
                <div className={style.wrapper}></div>
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>법안 내용 요약</h3>
                <div className={style.wrapper}>
                    <pre className={style.billSummaryText}>{bill.billSummary}</pre>
                </div>
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>찬반 현황</h3>
                {bill.yesTcnt ? (
                    <dl className={style.wrapper__grid}>
                        <div className={style.resultCard} data-label="찬성">
                            <dd>{bill.yesTcnt ? bill.yesTcnt : 0}</dd>
                            <dt>찬성</dt>
                        </div>
                        <div className={style.resultCard} data-label="반대">
                            <dd>{bill.noTcnt ? bill.noTcnt : 0}</dd>
                            <dt>반대</dt>
                        </div>
                        <div className={style.resultCard} data-label="기권">
                            <dd>{bill.blankTcnt ? bill.blankTcnt : 0}</dd>
                            <dt>기권</dt>
                        </div>
                        <div className={style.resultCard} data-label="불참">
                            {/* 추후 불참 데이터로 바꿔야함 */}
                            <dd>{bill.blankTcnt ? bill.blankTcnt : 0}</dd>
                            <dt>불참</dt>
                        </div>
                    </dl>
                ) : (
                    <div className={style.resultCard}>
                        <dt>아직 본회의 표결이 진행되지 않았습니다.</dt>
                    </div>
                )}
            </section>
            <section className={style.section}>
                <h3 className={style.sectionTitle}>국회의원 이념공간</h3>
                <div className={style.wrapper}></div>
            </section>
        </div>
    );
}

export default BillDetailPage;
