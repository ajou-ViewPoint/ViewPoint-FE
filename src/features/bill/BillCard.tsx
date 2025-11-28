import style from './BillCard.module.scss';
import { ChevronRight } from 'lucide-react';
import type { bill } from '../../types/bill';
import { useNavigate } from 'react-router-dom';
import BillTag from '../../widgets/tag/BillTag';
import { useBillStore } from '../../store/billStore';

function BillCard(billProp: bill) {
    const navigate = useNavigate();
    const { getSelectedBill } = useBillStore();

    const handleViewMore = async () => {
        await getSelectedBill(billProp.billId);
        navigate(`/billlist/${billProp.billId}`, { state: billProp });
    };

    return (
        <div className={style.container} onClick={handleViewMore}>
            <div className={style.header}>
                <h3 className={style.header__title}>{billProp.billTitle}</h3>
                <p className={style.header__date}>{billProp.proposeDt}</p>
            </div>
            <div className={style.tagRail}>
                {billProp.topic?.split(',').map((topic) => (
                    <BillTag tagText={topic} />
                ))}
            </div>
            <div className={style.wrapper}>
                <p className={style.summaryText}>{billProp.billSummary}</p>
                {billProp.billSummary ? (
                    <button className={style.moreButton}>
                        <ChevronRight className={style.moreButton__icon} />
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default BillCard;
