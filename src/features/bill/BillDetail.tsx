import { useLocation, useParams } from 'react-router-dom';
import style from './BillDetail.module.scss';
import type { bill } from '../../types/bill';

function BillDetail() {
    const { state } = useLocation() as { state: bill };
    const { billId } = useParams();
    return (
        <div className={style.wrapper}>
            <div className={style.detailContainer}>
                <div className={style.header}>
                    <h3 className={style.title}>{state.billTitle}</h3>
                    <p className={style.number}>123456</p>
                </div>
                <div className={style.leftSection}>
                    <div className={style.detailGrid}>
                        <p>발의 일자</p>
                        <p>대표 발의의원</p>
                        <p>제안 회기</p>
                        <p></p>
                        <p>{state.proposer}</p>
                        <p></p>
                    </div>
                    <div className={style.statusRail}></div>
                </div>
                <div className={style.rightSection}></div>
            </div>
            <div className={style.infographic}></div>
            <p className={style.summaryText}>{state.billSummary}</p>
        </div>
    );
}

export default BillDetail;
