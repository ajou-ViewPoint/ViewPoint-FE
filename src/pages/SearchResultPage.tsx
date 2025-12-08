import style from './styles/SearchResultPage.module.scss';
import { useEffect, useState } from 'react';
import MemberListCard from '../features/member/MemberListCard';
import RecentBillCard from '../features/bill/RecentBillCard';
import { useMainSearchStore } from '../store/mainSearchStore';
import { useParams } from 'react-router-dom';

function SearchResultPage() {
    const { getSearchResult } = useMainSearchStore();
    const searchResult = useMainSearchStore((state) => state.searchResult);
    const searchQuery = useMainSearchStore((state) => state.searchQuery);
    const [loading, setLoading] = useState<boolean>(false);
    const param = useParams();

    useEffect(() => {
        if (searchResult) return;
        const fetch = async () => {
            setLoading(true);
            try {
                if (param.query) await getSearchResult(param.query);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [getSearchResult, param.query, searchQuery, searchResult]);

    return (
        <div className={style.pageWrapper}>
            <header className={style.header}>
                <h1 className={style.header__title}>"{searchQuery}" 검색 결과</h1>
                {loading && <span className={style.header__discription}>불러오는 중...</span>}
                {!loading && (
                    <span className={style.sub}>
                        법안 {searchResult?.bills?.length ?? 0}개 · 의원{' '}
                        {searchResult?.members?.length ?? 0}명
                    </span>
                )}
            </header>
            <div className={style.contents}>
                {!loading &&
                    searchResult &&
                    !searchResult.bills?.length &&
                    !searchResult.members?.length && (
                        <div className={style.empty}>
                            <span>검색 결과가 없습니다.</span>
                        </div>
                    )}

                {!loading && searchResult && (
                    <div className={style.contents}>
                        {searchResult.bills?.length && (
                            <section className={style.header}>
                                <h2 className={style.header__title}>법안</h2>
                                <div className={style.grid}>
                                    {searchResult.bills.map((bill) => (
                                        <RecentBillCard key={bill.billId} {...bill} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {searchResult.members?.length && (
                            <section className={style.header}>
                                <h2 className={style.header__title}>의원</h2>
                                <div className={style.grid}>
                                    {searchResult.members.map((member) => (
                                        <MemberListCard key={member.memberId} member={member} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResultPage;
