import style from './styles/SearchFilter.module.scss';

function SearchFilter() {
    return (
        <div className={style.container}>
            <p className={style.filterName}>검색</p>
            <div className={style.inputSection}>
                <select>
                    <option value="billTitle">법안 이름</option>
                    <option value="proposer">발의 의원</option>
                    <option value="name"></option>
                    <option value="name"></option>
                    <option value="name"></option>
                </select>
                <form>
                    <input placeholder="검색어 입력" className={style.searchInput}></input>
                </form>
            </div>
        </div>
    );
}

export default SearchFilter;
