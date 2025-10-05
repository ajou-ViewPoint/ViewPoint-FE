import Header from '../widgets/Header';
import { Outlet } from 'react-router-dom';
import style from './styles/MainPage.module.scss';

function MainPage() {
    return (
        <div className={style.siteContainer}>
            <Header />
            <div className="body">
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
