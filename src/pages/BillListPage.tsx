import { useEffect } from 'react';
import BillCard from '../features/bill/BillCard';

import style from './styles/BillListPage.module.scss';
import { useBillFilterStore, useBillStore } from '../store/billStore';
function BillListPage() {
    const billList = useBillStore((state) => state.billList);
    const { getBillList } = useBillStore();
    const filterState = useBillFilterStore((state) => state.filterState);
    const { setFilterState } = useBillFilterStore();

    // 필터 정렬
    const handleDirectionChange = (newSortBy: string) => {
        setFilterState({
            ...filterState,
            direction: newSortBy,
            page: 0,
        });
    };

    useEffect(() => {
        getBillList();
    }, [getBillList]);

    return (
        <div className={style.wrapper}>
            <div className={style.filterContainer}>
                <form>
                    <input type="text" aria-label="검색" placeholder="검색어를 입력하세요"></input>
                </form>
                <div className={style.filterButtonRail}>
                    <label>내림</label>
                    <button onClick={() => handleDirectionChange('desc')}></button>
                    <label>오름</label>
                    <button onClick={() => handleDirectionChange('asc')}></button>
                </div>
            </div>
            <div className={style.billCardContainer}>
                {billList.map((item) => (
                    <BillCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}

export default BillListPage;
