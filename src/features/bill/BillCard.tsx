import style from './BillCard.module.scss';
import { ChevronRight } from 'lucide-react';
import type { bill } from '../../types/bill';
import { useNavigate } from 'react-router-dom';
import BillTag from '../../widgets/BillTag';

function BillCard(billProp: bill) {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/billlist/${billProp.id}`, { state: billProp });
    };

    return (
        <div className={style.container} onClick={handleViewMore}>
            <div className={style.header}>
                <h3 className={style.header__title}>{billProp.billTitle}</h3>
                <p className={style.header__date}>{billProp.committeePresentDate}</p>
            </div>
            <div className={style.tagRail}>
                <BillTag text="법안 태그" />
                <BillTag text="법안 태그" />
            </div>
            <div className={style.wrapper}>
                <p className={style.summaryText}>{billProp.billSummary}</p>
                <button className={style.moreButton}>
                    <ChevronRight className={style.moreButton__icon} />
                </button>
            </div>
        </div>
    );
}

export default BillCard;
