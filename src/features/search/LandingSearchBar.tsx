import { Search } from 'lucide-react';
import style from './LandingSearchBar.module.scss';

const mockTagsBills: string[] = [
    '조세특례제한법 개정안',
    '공공주택 특별법',
    '청년일자리 지원법',
    '근로기준법 개정안',
    '개인정보 보호법 개정안',
    '교육개혁특별법',
];

const mockTagsMembers: string[] = ['김철수 의원', '오세훈 의원'];

const mockTags: string[] = [...mockTagsBills, ...mockTagsMembers];

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
                {mockTags.map((item) => (
                    <a className={style.searchTag}>#{item}</a>
                ))}
            </div>
        </div>
    );
}

export default LandingSearchBar;
