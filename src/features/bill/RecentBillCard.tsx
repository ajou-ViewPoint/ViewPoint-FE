import type { bill } from '../../types/bill';
import BillTag from '../../widgets/BillTag';
import style from './RecentBillCard.module.scss';
import { Landmark, Calendar, User } from 'lucide-react';

function RecentBillCard({
    billTitle,
    proposer,
    yesTcnt,
    noTcnt,
    blankTcnt,
    procResultCd,
    rgsProcDate,
    billSummary,
}: bill) {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <h3 className={style.header__title}>{billTitle}</h3>
                <p
                    className={`${style.header__status} ${
                        procResultCd?.includes('가결') ? style.pass : ''
                    }`}>
                    {procResultCd}
                </p>
                <div className={style.header__info}>
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
                        {yesTcnt}/{noTcnt ? noTcnt : 0}/{blankTcnt ? blankTcnt : 0}
                    </p>
                </div>
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
