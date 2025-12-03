import useBillVoteResultStore from '../../store/BillVoteResultStore';
import style from './BillDetailPage.module.scss';

function VoteResultSection() {
    const voteResultCount = useBillVoteResultStore((state) => state.voteResultCount);
    return (
        <>
            <h3 className={style.sectionTitle}>찬반 현황</h3>
            {voteResultCount.agreeCount ? (
                <dl className={style.wrapper__grid}>
                    <div className={style.resultCard} data-label="찬성">
                        <dd>{voteResultCount.agreeCount ? voteResultCount.agreeCount : 0}</dd>
                        <dt>찬성</dt>
                    </div>
                    <div className={style.resultCard} data-label="반대">
                        <dd>{voteResultCount.disagreeCount ? voteResultCount.disagreeCount : 0}</dd>
                        <dt>반대</dt>
                    </div>
                    <div className={style.resultCard} data-label="기권">
                        <dd>{voteResultCount.abstainCount ? voteResultCount.abstainCount : 0}</dd>
                        <dt>기권</dt>
                    </div>
                    <div className={style.resultCard} data-label="불참">
                        <dd>{voteResultCount.absentCount ? voteResultCount.absentCount : 0}</dd>
                        <dt>불참</dt>
                    </div>
                </dl>
            ) : (
                <div className={style.resultCard}>
                    <dt>본회의 표결이 진행되지 않았습니다.</dt>
                </div>
            )}
        </>
    );
}

export default VoteResultSection;
