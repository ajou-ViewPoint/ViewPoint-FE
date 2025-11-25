import { NavLink, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import logo from '../../assets/ViewPoint.png';

function Header() {
    const navigate = useNavigate();

    const headerInfo = [
        { id: '법안', path: '/billlist' },
        { id: '위원회', path: '/committee' },
        { id: '정당', path: '/party' },
        { id: '국회의원', path: '/members' },
        { id: '우리 지역구', path: '/mydistrict' },
        { id: '프로젝트 소개', path: '/about' },
    ] as const;

    return (
        <div className={style.header}>
            <a className={style.logo} href="/">
                <img src={logo} alt="ViewPoint Logo" className={style.logoImage} />
            </a>
            <nav className={style.header__buttonRail}>
                {headerInfo.map((item) => (
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? `${style.header__button} ${style.active}`
                                : style.header__button
                        }
                        key={item.id}
                        onClick={() => navigate(item.path)}>
                        {item.id}
                    </NavLink>
                ))}
            </nav>

            {/* <form className={style.header__searchBar}>
                <input
                    className={style.header__searchBar__inputArea}
                    type="text"
                    aria-label="검색"
                    placeholder="검색어를 입력하세요"></input>
                <button className={style.header__searchBar__searchButton} type="submit">
                    <Search />
                </button>
            </form> */}
        </div>
    );
}

export default Header;
