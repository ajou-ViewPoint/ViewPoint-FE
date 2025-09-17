import Header from '../widgets/Header';
import { Outlet } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            <Header />
            <h1>랜딩</h1>
            <div className="body">
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
