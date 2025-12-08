import { Search } from 'lucide-react';
import style from './LandingSearchBar.module.scss';
import loadingStyle from '../../widgets/nominate/NominateScatterPlot.module.scss';
import { useState } from 'react';
import { useMainSearchStore } from '../../store/mainSearchStore';
import { useNavigate } from 'react-router-dom';

const mockTagsBills: { id: string; name: string }[] = [
    { id: 'bill-1', name: '국가보안법 폐지법률안' },
    { id: 'bill-2', name: '노동조합 및 노동관계조정법 일부개정법률안' },
    { id: 'bill-3', name: '국가공무원법 일부개정법률안' },
    { id: 'bill-4', name: '형법 일부개정법률안' },
    {
        id: 'bill-5',
        name: '특별검사',
    },
];

function LandingSearchBar() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const { getSearchResult, setSearchQuery } = useMainSearchStore();
    const navigate = useNavigate();

    const handleTagSearch = async (tagText: string) => {
        setSearchQuery(tagText);
        if (loading) return;
        setLoading(true);
        await getSearchResult(tagText);
        navigate(`/search/${tagText}`);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setSearchQuery(query);
        await getSearchResult(query);
        navigate(`/search/${query}`);
    };

    return (
        <div
            className={`${style.container} ${loading ? style.loading : ''}`}
            data-loading={loading}
            aria-busy={loading}>
            {loading && (
                <div aria-live="polite" role="status" className={loadingStyle.loaderOverlay}>
                    <div className={loadingStyle.loaderContent}>
                        <span className={loadingStyle.spinner} />
                        <span className={loadingStyle.loaderText}>검색 중...</span>
                    </div>
                </div>
            )}

            <form className={style.searchBar}>
                <input
                    className={`${style.searchBar__inputArea} ${loading ? style.loadingInput : ''}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    aria-label="검색"
                    placeholder="의안, 국회의원 등을 검색해보세요"
                    readOnly={loading}
                />
                <button
                    className={style.searchBar__searchButton}
                    onClick={handleSearch}
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}>
                    <Search className={style.searchBar__searchButtonIcon} />
                </button>
            </form>
            <div className={style.tagRail}>
                {mockTagsBills.map((item) => (
                    <a
                        className={style.searchTag}
                        key={item.id}
                        onClick={() => handleTagSearch(item.name)}>
                        #{item.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default LandingSearchBar;
