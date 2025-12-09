import BillDetailPage from '../pages/BillDetailPage/BillDetailPage';
import MemberDetail from '../features/member/MemberDetail';
import BillListPage from '../pages/BillListPage';
import CommitteePage from '../pages/CommitteePage';
import LandingPage from '../pages/LandingPage/LandingPage';
import MainPage from '../pages/MainPage';
import MemberListPage from '../pages/MemberListPage';
import MyDistrict from '../pages/MyDistrictPage/MyDistrict';
import PartyPage from '../pages/PartyPage';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CommitteeDetailPage from '../pages/CommitteeDetailPage/CommitteeDetailPage';
import PartyDetailPage from '../pages/PartyDetailPage/PartyDetailPage';
import DistrictDetailPage from '../pages/MyDistrictPage/DistrictDetail';
import AboutPage from '../pages/AboutPage';
import SearchResultPage from '../pages/SearchResultPage';
import MobileUnsupportedPage from '../pages/MobileUnsupportedPage';

function isMobileUserAgent() {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || navigator.vendor || '';
    return /android|iphone|ipad|ipod|iemobile|blackberry|webos/i.test(ua);
}

function App() {
    const isMobile = isMobileUserAgent();

    return (
        <BrowserRouter>
            {isMobile ? (
                <Routes>
                    <Route path="/unsupported" element={<MobileUnsupportedPage />} />
                    <Route path="*" element={<Navigate to="/unsupported" replace />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<MainPage />}>
                        <Route index element={<LandingPage />} />
                        <Route path="search/:query" element={<SearchResultPage />} />
                        <Route path="party" element={<PartyPage />} />
                        <Route path="party/:partyId" element={<PartyDetailPage />} />
                        <Route path="billlist" element={<BillListPage />} />
                        <Route path="billlist/:billId" element={<BillDetailPage />} />
                        <Route path="members" element={<MemberListPage />} />
                        <Route path="members/:memberId" element={<MemberDetail />} />
                        <Route path="committee" element={<CommitteePage />} />
                        <Route path="committee/:committeeId" element={<CommitteeDetailPage />} />
                        <Route path="mydistrict" element={<MyDistrict />} />
                        <Route path="mydistrict/:regionCd" element={<DistrictDetailPage />} />
                        <Route path="about" element={<AboutPage />} />
                    </Route>
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
