import { useState } from 'react';
import DateFilter from './DateFilter';
import PartyFilter from './PartyFilter';
import SearchFilter from './SearchFilter';
import StageFilter from './StageFilter';
import style from './styles/Filter.module.scss';
import TermFilter from './TermFilter';
import { ChevronUp, ChevronDown } from 'lucide-react';
function Filter() {
    const [detailFilter, setDetailFilter] = useState(false);

    const toggleDetailFilter = () => {
        setDetailFilter((prev) => !prev);
    };

    return (
        <div className={`${style.container} ${detailFilter ? style.expanded : ''}`}>
            <div className={style.close}>
                <SearchFilter />
                <button className={style.moreFilterButton} onClick={toggleDetailFilter}>
                    상세 필터
                    {detailFilter ? (
                        <ChevronUp style={{ color: '#CCCCCC' }} />
                    ) : (
                        <ChevronDown style={{ color: '#CCCCCC' }} />
                    )}
                </button>
            </div>
            <div className={style.detailSection}>
                <hr className={style.divider}></hr>
                <DateFilter />
                <TermFilter />
                <PartyFilter />
                <StageFilter />
            </div>
        </div>
    );
}

export default Filter;
