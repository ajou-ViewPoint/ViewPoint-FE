import { useState } from 'react';
import style from './styles/SearchFilter.module.scss';

function SearchFilter() {
    const [searchInput, setSearchInput] = useState('');
    const handleKeywordSearch = () => {};
    return (
        <div className={style.container}>
            <p className={style.filterName}>검색</p>
            <div className={style.inputSection}>
                <select>
                    <option value="billTitle">법안 이름</option>
                    <option value="proposer">발의 의원</option>
                </select>
                <form>
                    <input
                        placeholder="검색어 입력"
                        className={style.searchInput}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onSubmit={handleKeywordSearch}></input>
                </form>
            </div>
        </div>
    );
}

export default SearchFilter;
