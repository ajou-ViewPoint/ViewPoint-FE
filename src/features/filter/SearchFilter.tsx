import { useState } from 'react';
import style from './styles/SearchFilter.module.scss';
import { Search } from 'lucide-react';
import { useBillStore } from '../../store/billStore';
import { useMemberStore } from '../../store/memberStore';

interface FilterProps {
    selector: 'BILL' | 'MEMBER';
}
function SearchFilter({ selector }: FilterProps) {
    const [searchInput, setSearchInput] = useState('');
    const pageState = useBillStore((state) => state.billListPagination);
    const memberPageState = useMemberStore((state) => state.memberListPagination);
    const { setPage } = useBillStore();
    const { setMemberListPage } = useMemberStore();

    const handleKeywordSearch = () => {
        const newKeyword = searchInput.trim();
        if (selector === 'BILL') {
            setPage({ ...pageState, pageNumber: 0, keyword: newKeyword });
            return;
        }
        if (selector === 'MEMBER') {
            setMemberListPage({ ...memberPageState, pageNumber: 0, keyword: newKeyword });
            return;
        }
    };
    return (
        <div className={style.container}>
            <p className={style.filterName}>검색</p>
            <div className={style.inputSection}>
                <select>
                    {selector === 'BILL' ? (
                        <>
                            <option value="billTitle">법안 이름</option>
                            <option value="proposer">발의 의원</option>
                        </>
                    ) : (
                        <>
                            <option value="billTitle">의원 이름</option>
                        </>
                    )}
                </select>
                <form
                    className={style.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleKeywordSearch();
                    }}>
                    <input
                        placeholder="검색어 입력"
                        className={style.searchInput}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" aria-label="검색" className={style.searchButton}>
                        <Search className={style.searchIcon} size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchFilter;
