import style from './styles/CommitteePage.module.scss';

function CommitteePage() {
    const committeeList = [
        { name: '국회운영위원회', path: 'housesteering' },
        { name: '법제사법위원회', path: 'legislation' },
        { name: '정무위원회', path: 'policy' },
        { name: '기획재정위원회', path: 'finance' },
        { name: '예산결산특별위원회', path: 'budget' },
        { name: '교육위원회', path: 'education' },
        { name: '과학기술정보방송통신위원회', path: 'science' },
        { name: '외교통일위원회', path: 'diplomacy' },
        { name: '국방위원회', path: 'defense' },
        { name: '행정안전위원회', path: 'administration' },
        { name: '문화체육관광위원회', path: 'culture' },
        { name: '농림축산식품해양수산위원회', path: 'agriculture' },
        { name: '산업통상자원중소벤처기업위원회', path: 'industry' },
        { name: '보건복지위원회', path: 'welfare' },
        { name: '환경노동위원회', path: 'environment' },
        { name: '국토교통위원회', path: 'land' },
        { name: '정보위원회', path: 'intelligence' },
        { name: '여성가족위원회', path: 'gender' },
    ] as const;
    return (
        <div className={style.wrapper}>
            <h2>상임위원회 및 상설특별위원회</h2>
            <h3 className={style.semiTitle}>운영·조정</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        ['국회운영위원회', '정보위원회', '예산결산특별위원회'].includes(item.name)
                    )
                    .map((item) => (
                        <button className={style.committeeButton} key={item.path}>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.semiTitle}>법·제도·재정</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        ['법제사법위원회', '정무위원회', '기획재정위원회'].includes(item.name)
                    )
                    .map((item) => (
                        <button className={style.committeeButton} key={item.path}>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.semiTitle}>사회·교육·문화</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        [
                            '교육위원회',
                            '보건복지위원회',
                            '환경노동위원회',
                            '여성가족위원회',
                            '문화체육관광위원회',
                        ].includes(item.name)
                    )
                    .map((item) => (
                        <button className={style.committeeButton} key={item.path}>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.semiTitle}>산업·경제·과학</h3>
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
                        <button className={style.committeeButton} key={item.path}>
                            {item.name}
                        </button>
                    ))}
            </div>
            <h3 className={style.semiTitle}>외교·안보·행정</h3>
            <div className={style.buttonRail}>
                {committeeList
                    .filter((item) =>
                        ['외교통일위원회', '국방위원회', '행정안전위원회'].includes(item.name)
                    )
                    .map((item) => (
                        <button className={style.committeeButton} key={item.path}>
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
