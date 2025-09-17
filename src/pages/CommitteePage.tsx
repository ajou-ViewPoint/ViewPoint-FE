function CommitteePage() {
    const committeeList = [
        { name: '국회운영위원회', path: '/operation' },
        { name: '법제사법위원회', path: '/law' },
        { name: '정무위원회', path: '/administration' },
        { name: '기획재정위원회', path: '/finance' },
        { name: '교육위원회', path: '/education' },
        { name: '과학기술정보방송통신위원회', path: '/science' },
        { name: '외교통일위원회', path: '/diplomacy' },
        { name: '국방위원회', path: '/defense' },
        { name: '행정안전위원회', path: '/safety' },
        { name: '문화체육관광위원회', path: '/culture' },
        { name: '농림축산식품해양수산위원회', path: '/agriculture' },
        { name: '산업통상자원중소벤처기업위원회', path: '/industry' },
        { name: '보건복지위원회', path: '/welfare' },
        { name: '환경노동위원회', path: '/environment' },
        { name: '국토교통위원회', path: '/land' },
        { name: '정보위원회', path: '/intelligence' },
        { name: '여성가족위원회', path: '/women' },
    ] as const;
    return (
        <div>
            <h1>상임위원회</h1>
            <div>
                {committeeList.map((item) => (
                    <button>{item.name}</button>
                ))}
            </div>
        </div>
    );
}

export default CommitteePage;
