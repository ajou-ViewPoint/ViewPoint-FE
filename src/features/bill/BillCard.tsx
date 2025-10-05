import style from './BillCard.module.scss';
import { ChevronRight } from 'lucide-react';
import type { bill } from '../../types/bill';
import { useNavigate } from 'react-router-dom';

function BillCard(billProp: bill) {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/billlist/${billProp.id}`, { state: billProp });
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.header__main}>
                    <h3 className={style.header__title}>{billProp.billTitle}</h3>
                    <p className={style.header__number}>123456</p>
                </div>
                <p className={style.header__date}>제안일</p>
            </div>
            <ul className={style.statusRail}>
                {billProp.procResultCd === '원안가결' ? (
                    <>
                        <li className={style.status__yes}>{billProp.yesTcnt}</li>
                        <li className={style.status__no}> {billProp.noTcnt}</li>
                        <li className={style.status__blank}>{billProp.blankTcnt}</li>
                    </>
                ) : (
                    <li className={style.status}>{billProp.procResultCd}</li>
                )}
            </ul>
            <p className={style.summaryText}>
                현행법은 부가통신사업자 등이 자신이 운영ㆍ관리하는 정보통신망을 통하여
                불법촬영물등이 유통되는 사정을 신고, 삭제요청 등을 통해 인식한 경우에는 해당 정보의
                삭제ㆍ접속차단 등 유통방지에 필요한 조치를 하도록 규정함...
            </p>
            <button className={style.moreButton} onClick={handleViewMore}>
                전체보기
                <ChevronRight />
            </button>
        </div>
    );
}

export default BillCard;
