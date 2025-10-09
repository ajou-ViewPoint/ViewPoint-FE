import BillDetail from '../features/bill/BillDetail';
import MemberDetail from '../features/member/MemberDetail';
import About from '../pages/About';
import BillListPage from '../pages/BillListPage';
import CommitteePage from '../pages/CommitteePage';
import LandingPage from '../pages/LandingPage';
import MainPage from '../pages/MainPage';
import MemberListPage from '../pages/MemberListPage';
import MyDistrict from '../pages/MyDistrict';
import PartyPage from '../pages/PartyPage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/party" element={<PartyPage />} />
                        <Route path="/billlist" element={<BillListPage />} />
                        <Route path="/billlist/:billId" element={<BillDetail />} />
                        <Route path="/members" element={<MemberListPage />} />
                        <Route path="/members/:memberId" element={<MemberDetail />} />
                        <Route path="/committee" element={<CommitteePage />} />
                        <Route path="/mydistrict" element={<MyDistrict />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
