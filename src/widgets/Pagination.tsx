import style from './Pagination.module.scss';

interface PaginationInfo {
    totalPage: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
}
function Pagination(Pagination: PaginationInfo) {
    return <div className={style.wrapper}>{Pagination.currentPage}</div>;
}

export default Pagination;
