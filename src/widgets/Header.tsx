import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const headerInfo = [
        { id: '랜딩', path: '/' },
        { id: '정당', path: '/party' },
        { id: '위원회', path: '/committee' },
        { id: '법안 리스트', path: '/billlist' },
        { id: '국회의원', path: '/member' },
        { id: '우리 지역구', path: '/mydistrict' },
        { id: 'about', path: '/about' },
    ] as const;

    return (
        <div>
            <div>
                <h2>ViewPoint</h2>
                <input placeholder="검색바입니다"></input>
            </div>

            {headerInfo.map((item) => (
                <button key={item.id} onClick={() => navigate(item.path)}>
                    {item.id}
                </button>
            ))}
        </div>
    );
}

export default Header;
