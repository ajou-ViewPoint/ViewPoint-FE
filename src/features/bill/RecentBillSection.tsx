import { useEffect } from 'react';
import { useBillStore } from '../../store/billStore';
import RecentBillCard from './RecentBillCard';
import style from './RecentBillSection.module.scss';

function RecentBillSection() {
    const recentBillList = useBillStore((state) => state.recentBillList);
    const { getRecentBillList } = useBillStore();

    useEffect(() => {
        getRecentBillList();
    }, [getRecentBillList]);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>02.</p>
                <h2 className={style.header__title}>최근 발의된 의안 한눈에 보기</h2>
                <p className={style.header__discription}>최근 발의된 의안들을 확인해보세요.</p>
            </div>
            <div className={style.contents}>
                {recentBillList.map((bill) => (
                    <RecentBillCard key={bill.id} {...bill} />
                ))}
            </div>
        </div>
    );
}

export default RecentBillSection;
