import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-react';
import style from './BillPagination.module.scss';
import { useBillStore } from '../store/billStore';

function BillPagination() {
    const pageState = useBillStore((state) => state.billListPagination);
    const { setPage } = useBillStore();
    const MAX_PAGE = 10;

    const handlePagination = (nextPage: number) => {
        if (nextPage < 0 || nextPage > pageState.totalPages) return;
        setPage({ ...pageState, pageNumber: nextPage });
    };

    return (
        <div className={style.wrapper}>
            <button
                className={`${style.chevronButton} ${pageState.first ? style.chevronDisabled : ''}`}
                onClick={() => handlePagination(0)}>
                <ChevronsLeft />
            </button>
            <button
                className={`${style.chevronButton} ${pageState.first ? style.chevronDisabled : ''}`}
                onClick={() => handlePagination(pageState.pageNumber - 1)}>
                <ChevronLeft />
            </button>
            <div className={style.numberButtonRail}>
                {Array.from({ length: MAX_PAGE }, (_, i) => i + 1).map((num) => (
                    <button
                        className={`${style.numberButton} ${
                            num - 1 === pageState.pageNumber ? style.current : ''
                        }`}
                        key={num}
                        onClick={() =>
                            handlePagination(Math.floor(pageState.pageNumber / 10) * 10 + num - 1)
                        }>
                        {Math.floor(pageState.pageNumber / 10) * 10 + num}
                    </button>
                ))}
            </div>

            <span className={style.ellipsis}>
                <Ellipsis />
            </span>
            <button className={style.numberButton}>{pageState.totalPages}</button>
            {/* 버튼 10개 */}
            {/* elipsis 구간 */}
            {/* 마지막 페이지 버튼 */}
            <button
                className={style.chevronButton}
                onClick={() => handlePagination(pageState.pageNumber + 1)}>
                <ChevronRight />
            </button>

            <button
                className={style.chevronButton}
                onClick={() => handlePagination(pageState.totalPages - 1)}>
                <ChevronsRight />
            </button>
        </div>
    );
}

export default BillPagination;
