import { useEffect } from 'react';
import BillCard from '../features/bill/BillCard';
import style from './styles/BillListPage.module.scss';
import { useBillFilterStore, useBillStore } from '../store/billStore';
import Filter from '../features/filter/Filter';
import BillSortButtons from '../widgets/sort/BillSortButtons';
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

    const handleSortChange = (newSortBy: string) => {
        setFilterState({ ...filterState, sortBy: newSortBy, page: 0 });
    };

    useEffect(() => {
        getBillList();
    }, [getBillList, filterState]);

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>법안 정보</h1>
                <p className={style.header__discription}>
                    국회에 발의된 법안의 심사 진행 상황과 표결 결과를 확인해보세요.
                </p>
            </div>
            <Filter />

            <div className={style.resultHeader}>
                <p className={style.resultHeader__count}>총 20건</p>
                <BillSortButtons />
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
