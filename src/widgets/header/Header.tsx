import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import logo from '../../assets/ViewPoint.png';

function Header() {
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
            <a className={style.logo} href="/" aria-label="홈으로 이동">
                <img src={logo} alt="뷰포인트 로고" className={style.logoImage} />
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
                        key={item.id}>
                        {item.id}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default Header;
