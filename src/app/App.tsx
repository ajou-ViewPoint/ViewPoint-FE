import About from '../pages/About';
import BillListPage from '../pages/BillListPage';
import CommitteePage from '../pages/CommitteePage';
import MainPage from '../pages/MainPage';
import MemberPage from '../pages/MemberPage';
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
                        <Route path="/party" element={<PartyPage />} />
                        <Route path="/billlist" element={<BillListPage />} />
                        <Route path="/member" element={<MemberPage />} />
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
