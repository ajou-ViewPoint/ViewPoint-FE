import Header from '../widgets/header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import style from './styles/MainPage.module.scss';

function MainPage() {
    const location = useLocation();
    const isLanding = location.pathname === '/';
    return (
        <div className={`${style.siteContainer} ${isLanding ? style.landingBackground : ''}`}>
            <Header />
            <div className="body">
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
