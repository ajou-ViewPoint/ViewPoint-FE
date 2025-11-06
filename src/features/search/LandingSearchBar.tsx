import { Search } from 'lucide-react';
import style from './LandingSearchBar.module.scss';

const mockTagsBills: { id: string; name: string }[] = [
    { id: 'bill-1', name: '조세특례제한법 개정안' },
    { id: 'bill-2', name: '공공주택 특별법' },
    { id: 'bill-3', name: '청년일자리 지원법' },
    { id: 'bill-4', name: '근로기준법 개정안' },
];

const handleSearch = () => {};

function LandingSearchBar() {
    return (
        <div className={style.container}>
            <form className={style.searchBar}>
                <input
                    className={style.searchBar__inputArea}
                    type="text"
                    aria-label="검색"
                    placeholder="의안, 국회의원 등을 검색해보세요"></input>
                <button
                    className={style.searchBar__searchButton}
                    onClick={handleSearch}
                    type="submit">
                    <Search className={style.searchBar__searchButtonIcon} />
                </button>
            </form>
            <div className={style.tagRail}>
                {mockTagsBills.map((item) => (
                    <a className={style.searchTag} key={item.id}>
                        #{item.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default LandingSearchBar;
