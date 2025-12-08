import { useEffect, useRef } from 'react';
import BillCard from '../features/bill/BillCard';
import style from './styles/BillListPage.module.scss';
import { useBillStore } from '../store/billStore';
import Filter from '../features/filter/Filter';
import BillSortButtons from '../widgets/sort/BillSortButtons';
import BillPagination from '../widgets/pagination/BillPagination';

function BillListPage() {
    const billList = useBillStore((state) => state.billList);
    const filterRef = useRef<HTMLDivElement>(null);
    const billListRef = useRef<HTMLDivElement>(null);
    const getBillList = useBillStore((state) => state.getBillList);
    const totalBillElements = useBillStore((state) => state.billListPagination.totalElements);
    const pageNumberState = useBillStore((state) => state.billListPagination.pageNumber);
    const sortDirectionState = useBillStore((state) => state.billListPagination.direction);
    const sortByState = useBillStore((state) => state.billListPagination.sortBy);
    const keywordState = useBillStore((state) => state.billListPagination.keyword);
    const startState = useBillStore((state) => state.billListPagination.start);
    const endState = useBillStore((state) => state.billListPagination.end);
    const ageState = useBillStore((state) => state.billListPagination.age);
    const partyState = useBillStore((state) => state.billListPagination.party);
    const procResultCdState = useBillStore((state) => state.billListPagination.procResultCd);

    useEffect(() => {
        getBillList();
    }, [
        getBillList,
        pageNumberState,
        sortDirectionState,
        sortByState,
        keywordState,
        startState,
        endState,
        ageState,
        partyState,
        procResultCdState,
    ]);

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>법안 정보</h1>
                <p className={style.header__discription}>
                    국회에 발의된 법안의 심사 진행 상황과 표결 결과를 확인해보세요.
                </p>
            </div>

            <div className={style.tagGrid}>
                {Array.from({ length: 22 }, (_, i) => 22 - i).map((age) => (
                    <button className={style.tag} key={age} value={age} onClick={() => {}}>
                        {age === 1 ? '제헌' : age + '대'}
                    </button>
                ))}
            </div>

            <div ref={filterRef}>
                <Filter selector={'BILL'} />
            </div>

            <div className={style.resultHeader} ref={billListRef}>
                <p className={style.resultHeader__count}>총 {totalBillElements}건</p>
                <BillSortButtons />
            </div>

            <div className={style.billCardContainer}>
                {billList.map((item) => (
                    <BillCard key={item.id} {...item} />
                ))}
            </div>
            <BillPagination
                setScrollUp={() => billListRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
        </div>
    );
}

export default BillListPage;
