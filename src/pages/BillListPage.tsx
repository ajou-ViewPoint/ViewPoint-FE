import { useEffect, useRef } from 'react';
import BillCard from '../features/bill/BillCard';
import style from './styles/BillListPage.module.scss';
import { useBillStore } from '../store/billStore';
import Filter from '../features/filter/Filter';
import BillSortButtons from '../widgets/sort/BillSortButtons';
// import Pagination from '../widgets/Pagination';
function BillListPage() {
    const billList = useBillStore((state) => state.billList);
    const filterRef = useRef<HTMLDivElement>(null);
    const billCardContainerRef = useRef<HTMLDivElement>(null);
    const { getBillList } = useBillStore();

    const pageNumberState = useBillStore((state) => state.billListPagination.pageNumber);
    const sortDirectionState = useBillStore((state) => state.billListPagination.direction);
    const sortByState = useBillStore((state) => state.billListPagination.sortBy);

    useEffect(() => {
        const filterFocused =
            document.activeElement && filterRef.current?.contains(document.activeElement);
        if (!filterFocused) {
            getBillList();
        }
        window.scroll(0, 0);
        // billCardContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [getBillList, pageNumberState, sortDirectionState, sortByState]);

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>법안 정보</h1>
                <p className={style.header__discription}>
                    국회에 발의된 법안의 심사 진행 상황과 표결 결과를 확인해보세요.
                </p>
            </div>
            <div ref={filterRef}>
                <Filter />
            </div>

            <div className={style.resultHeader}>
                <p className={style.resultHeader__count}>총 20건</p>
                <BillSortButtons />
            </div>

            <div className={style.billCardContainer} ref={billCardContainerRef}>
                {billList.map((item) => (
                    <BillCard key={item.id} {...item} />
                ))}
            </div>
            {/* <Pagination /> */}
        </div>
    );
}

export default BillListPage;
