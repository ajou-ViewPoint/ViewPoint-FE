import { useNavigate } from 'react-router-dom';
import style from './BillTag.module.scss';
import { useMainSearchStore } from '../../store/mainSearchStore';
import { useState } from 'react';

interface BillTagProps {
    tagText: string;
}

function BillTag({ tagText }: BillTagProps) {
    const { getSearchResult, setSearchQuery } = useMainSearchStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        if (loading) return;
        setLoading(true);
        setSearchQuery(tagText);
        await getSearchResult(tagText);
        navigate(`/search/${tagText}`);
    };

    return (
        <button
            className={`${style.container} ${loading ? style.isLoading : ''}`}
            onClick={(e) => handleSearch(e)}
            disabled={loading}
            aria-busy={loading}
            aria-live="polite">
            {loading && <span className={style.spinner} aria-hidden="true" />}
            <span className={style.text}>#{tagText}</span>
            {loading && <span className={style.loadingText}>검색 중...</span>}
        </button>
    );
}

export default BillTag;
