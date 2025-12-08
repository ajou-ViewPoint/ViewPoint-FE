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
        window.scrollTo(0, 0);
    }, []);

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
                <h1 className={style.header__title}>"{param.query}"에 대한 검색 결과입니다.</h1>
                {loading && <span className={style.header__discription}>불러오는 중...</span>}
                {!loading && (
                    <span className={style.header__discription}>
                        법안 {searchResult?.bills?.length ?? 0}개 · 의원{' '}
                        {searchResult?.members?.length ?? 0}명
                    </span>
                )}
            </header>
            <div className={style.contents}>
                {!loading && searchResult && (
                    <>
                        <div className={style.contents}>
                            <div className={style.header}>
                                <h2 className={style.header__title}>법안</h2>
                            </div>
                            {searchResult.bills?.length ? (
                                <section className={style.header}>
                                    <div className={style.grid}>
                                        {searchResult.bills.slice(0, 10).map((bill) => (
                                            <RecentBillCard key={bill.billId} {...bill} />
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <div className={style.empty}>
                                    <span>검색 결과가 없습니다.</span>
                                </div>
                            )}
                        </div>
                        <div className={style.contents}>
                            <div className={style.header}>
                                <h2 className={style.header__title}>의원</h2>
                            </div>
                            {searchResult.members?.length ? (
                                <section className={style.header}>
                                    <div className={style.grid__member}>
                                        {searchResult.members.map((member) => (
                                            <MemberListCard key={member.memberId} member={member} />
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <div className={style.empty}>
                                    <span>검색 결과가 없습니다.</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchResultPage;
