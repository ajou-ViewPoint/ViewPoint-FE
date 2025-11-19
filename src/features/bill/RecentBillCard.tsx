import { useNavigate } from 'react-router-dom';
import type { bill } from '../../types/bill';
import BillTag from '../../widgets/BillTag';
import style from './RecentBillCard.module.scss';
import { Landmark, Calendar, User } from 'lucide-react';
import { useBillStore } from '../../store/billStore';

function RecentBillCard({
    billTitle,
    proposer,
    yesTcnt,
    noTcnt,
    blankTcnt,
    procResultCd,
    rgsProcDate,
    billSummary,
    billId,
}: bill) {
    const navigate = useNavigate();
    const { getSelectedBill } = useBillStore();

    const moveToBillDetailPage = async () => {
        await getSelectedBill(billId);
        navigate(`/billlist/${billId}`);
    };
    return (
        <div className={style.container} onClick={moveToBillDetailPage}>
            <div className={style.header}>
                <h3 className={style.header__title}>{billTitle}</h3>
            </div>
            <div className={style.header__info}>
                <p
                    className={`${style.header__status} ${
                        procResultCd?.includes('가결') ? style.pass : ''
                    }`}>
                    {procResultCd}
                </p>
                <p className={style.header__proposer}>
                    <User />
                    {proposer}
                </p>
                <p className={style.header__date}>
                    <Calendar />
                    {rgsProcDate}
                </p>
                <p className={style.header__voteResult}>
                    <Landmark />
                    {yesTcnt ? yesTcnt : 0}/{noTcnt ? noTcnt : 0}/{blankTcnt ? blankTcnt : 0}
                </p>
            </div>
            <div className={style.tagRail}>
                <BillTag text="부동산" />
                <BillTag text="소상공인" />
            </div>
            <p className={style.summaryText}>{billSummary}</p>
        </div>
    );
}

export default RecentBillCard;

// 카드 너비 줄어들면 태그와 기타 정보를 같은 행으로
