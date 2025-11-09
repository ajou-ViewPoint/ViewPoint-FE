import BillDetailPage from '../pages/BillDetailPage/BillDetailPage';
import MemberDetail from '../features/member/MemberDetail';
import About from '../pages/About';
import BillListPage from '../pages/BillListPage';
import CommitteePage from '../pages/CommitteePage';
import LandingPage from '../pages/LandingPage/LandingPage';
import MainPage from '../pages/MainPage';
import MemberListPage from '../pages/MemberListPage';
import MyDistrict from '../pages/MyDistrictPage/MyDistrict';
import PartyPage from '../pages/PartyPage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommitteeDetailPage from '../pages/CommitteeDetailPage/CommitteeDetailPage';
import PartyDetailPage from '../pages/PartyDetailPage/PartyDetailPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/party" element={<PartyPage />} />
                        <Route path="/party/:partyId" element={<PartyDetailPage />} />
                        <Route path="/billlist" element={<BillListPage />} />
                        <Route path="/billlist/:billId" element={<BillDetailPage />} />
                        <Route path="/members" element={<MemberListPage />} />
                        <Route path="/members/:memberId" element={<MemberDetail />} />
                        <Route path="/committee" element={<CommitteePage />} />
                        <Route path="/committee/:committeeId" element={<CommitteeDetailPage />} />
                        <Route path="/mydistrict" element={<MyDistrict />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
