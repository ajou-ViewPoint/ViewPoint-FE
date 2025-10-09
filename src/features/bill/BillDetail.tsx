import { useLocation, useParams } from 'react-router-dom';
import style from './BillDetail.module.scss';
import type { bill } from '../../types/bill';
import { useBillStore } from '../../store/billStore';
import { useEffect, useState } from 'react';

function BillDetail() {
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

    if (!bill) return <div>Loading...</div>;

    return (
        <div className={style.wrapper}>
            <div className={style.detailContainer}>
                <div className={style.header}>
                    <h3 className={style.title}>{bill.billTitle}</h3>
                    <p className={style.number}>123456</p>
                </div>
                <div className={style.leftSection}>
                    <div className={style.detailGrid}>
                        <p>발의 일자</p>
                        <p>대표 발의의원</p>
                        <p>제안 회기</p>
                        <p></p>
                        <p>{bill.proposer}</p>
                        <p></p>
                    </div>
                    <div className={style.statusRail}></div>
                </div>
                <div className={style.rightSection}></div>
            </div>
            <div className={style.infographic}></div>
            <p className={style.summaryText}>{bill.billSummary}</p>
        </div>
    );
}

export default BillDetail;
