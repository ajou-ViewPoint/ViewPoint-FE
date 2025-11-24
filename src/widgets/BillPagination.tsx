import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-react';
import style from './BillPagination.module.scss';
import { useBillStore } from '../store/billStore';

interface BillPaginationProps {
    setScrollUp: () => void;
}

function BillPagination({ setScrollUp }: BillPaginationProps) {
    const pageState = useBillStore((state) => state.billListPagination);
    const { setPage } = useBillStore();
    const MAX_PAGE = 10;
    const isLastPages = () => {
        if (pageState.pageNumber >= pageState.totalPages - (pageState.totalPages % 10)) {
            return true;
        } else {
            return false;
        }
    };

    const handlePagination = (nextPage: number) => {
        if (nextPage < 0 || nextPage > pageState.totalPages) return;
        setPage({ ...pageState, pageNumber: nextPage });
        setScrollUp();
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
            {/* 페이지 번호 버튼(기본 10개씩)*/}

            {isLastPages() ? (
                <div className={style.numberButtonRail}>
                    {Array.from({ length: pageState.totalPages % 10 }, (_, i) => i + 1).map(
                        (num) => (
                            <button
                                className={`${style.numberButton} ${
                                    Math.floor(pageState.pageNumber / 10) * 10 + num - 1 ===
                                    pageState.pageNumber
                                        ? style.current
                                        : ''
                                }`}
                                key={num}
                                onClick={() =>
                                    handlePagination(
                                        Math.floor(pageState.pageNumber / 10) * 10 + num - 1
                                    )
                                }>
                                {Math.floor(pageState.pageNumber / 10) * 10 + num}
                            </button>
                        )
                    )}
                </div>
            ) : (
                <>
                    <div className={style.numberButtonRail}>
                        {Array.from({ length: MAX_PAGE }, (_, i) => i + 1).map((num) => (
                            <button
                                className={`${style.numberButton} ${
                                    Math.floor(pageState.pageNumber / 10) * 10 + num - 1 ===
                                    pageState.pageNumber
                                        ? style.current
                                        : ''
                                }`}
                                key={num}
                                onClick={() =>
                                    handlePagination(
                                        Math.floor(pageState.pageNumber / 10) * 10 + num - 1
                                    )
                                }>
                                {Math.floor(pageState.pageNumber / 10) * 10 + num}
                            </button>
                        ))}
                    </div>
                    <span className={style.ellipsis}>
                        <Ellipsis />
                    </span>
                </>
            )}

            {/* 마지막 페이지 버튼 */}
            {isLastPages() ? (
                ''
            ) : (
                <button
                    className={style.numberButton}
                    onClick={() => handlePagination(pageState.totalPages - 1)}>
                    {pageState.totalPages}
                </button>
            )}

            {/* 다음 페이지 버튼 */}
            <button
                className={style.chevronButton}
                onClick={() => handlePagination(pageState.pageNumber + 1)}>
                <ChevronRight />
            </button>
            {/* 가장 마지막 페이지로 가는 버튼 */}
            <button
                className={style.chevronButton}
                onClick={() => handlePagination(pageState.totalPages - 1)}>
                <ChevronsRight />
            </button>
        </div>
    );
}

export default BillPagination;
