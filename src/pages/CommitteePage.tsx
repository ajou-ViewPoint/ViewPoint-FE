import { useNavigate } from 'react-router-dom';
import style from './styles/CommitteePage.module.scss';
import { useCommitteeStore } from '../store/committeeStore';

function CommitteePage() {
    const committeeList = [
        { name: '국회운영위원회', committeeId: '1' },
        { name: '성평등가족위원회', committeeId: '335' },
        { name: '정보위원회', committeeId: '16' },
        { name: '국토교통위원회', committeeId: '15' },
        { name: '기후에너지환경노동위원회', committeeId: '334' },
        { name: '보건복지위원회', committeeId: '13' },
        { name: '산업통상자원중소벤처기업위원회', committeeId: '12' },
        { name: '농림축산식품해양수산위원회', committeeId: '11' },
        { name: '문화체육관광위원회', committeeId: '10' },
        { name: '행정안전위원회', committeeId: '9' },
        { name: '국방위원회', committeeId: '8' },
        { name: '외교통일위원회', committeeId: '7' },
        { name: '과학기술정보방송통신위원회', committeeId: '6' },
        { name: '교육위원회', committeeId: '5' },
        { name: '기획재정위원회', committeeId: '4' },
        { name: '정무위원회', committeeId: '3' },
        { name: '법제사법위원회', committeeId: '2' },
        { name: '예산결산특별위원회', committeeId: '18' },
    ] as const;

    const navigate = useNavigate();
    const { getCommitteeById, getCommitteeDetail } = useCommitteeStore();

    const preFetchCommitteeDetail = async (committeeId: string, committeeName: string) => {
        await getCommitteeById(committeeId);
        await getCommitteeDetail(committeeName);
    };

    const navigateToCommitteeDetailPage = async (committeeId: string, committeeName: string) => {
        await preFetchCommitteeDetail(committeeId, committeeName);
        navigate(`/committee/${committeeId}`, { state: { committeeName } });
    };

    return (
        <div className={style.wrapper}>
            {/* <h2 className={style.title}>위원회 메뉴</h2> */}
            <h3 className={style.sectorTitle}>운영·조정</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        ['국회운영위원회', '정보위원회', '예산결산특별위원회'].includes(item.name)
                    )
                    .map((item) => (
                        <button
                            className={style.committeeButton}
                            key={item.committeeId}
                            onClick={() =>
                                navigateToCommitteeDetailPage(item.committeeId, item.name)
                            }>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.sectorTitle}>법·제도·재정</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        ['법제사법위원회', '정무위원회', '기획재정위원회'].includes(item.name)
                    )
                    .map((item) => (
                        <button
                            className={style.committeeButton}
                            key={item.committeeId}
                            onClick={() =>
                                navigateToCommitteeDetailPage(item.committeeId, item.name)
                            }>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.sectorTitle}>사회·교육·문화</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        [
                            '교육위원회',
                            '보건복지위원회',
                            '기후에너지환경노동위원회',
                            '성평등가족위원회',
                            '문화체육관광위원회',
                        ].includes(item.name)
                    )
                    .map((item) => (
                        <button
                            className={style.committeeButton}
                            key={item.committeeId}
                            onClick={() =>
                                navigateToCommitteeDetailPage(item.committeeId, item.name)
                            }>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.sectorTitle}>산업·경제·과학</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        [
                            '과학기술정보방송통신위원회',
                            '농림축산식품해양수산위원회',
                            '산업통상자원 중소벤처기업위원회',
                            '국토교통위원회',
                        ].includes(item.name)
                    )
                    .map((item) => (
                        <button
                            className={style.committeeButton}
                            key={item.committeeId}
                            onClick={() =>
                                navigateToCommitteeDetailPage(item.committeeId, item.name)
                            }>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.sectorTitle}>외교·안보·행정</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        ['외교통일위원회', '국방위원회', '행정안전위원회'].includes(item.name)
                    )
                    .map((item) => (
                        <button
                            className={style.committeeButton}
                            key={item.committeeId}
                            onClick={() =>
                                navigateToCommitteeDetailPage(item.committeeId, item.name)
                            }>
                            {item.name}
                        </button>
                    ))}
            </div>
            {/* <h3 className={style.semiTitle}>특별</h3> */}
            {/* 특별 위원회는 여기에 추가 */}
            {/* <div className={style.buttonRail}>
                {committeeList.map((item) => (
                    <button className={style.committeeButton}>{item.name}</button>
                ))}
            </div> */}
        </div>
    );
}

export default CommitteePage;
