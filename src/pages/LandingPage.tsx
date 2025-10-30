import style from './styles/LandingPage.module.scss';
import topicImage from '../assets/yellowEnvelope.png';
import { Link } from 'react-router-dom';
import LandingSearchBar from '../features/search/LandingSearchBar';
import TopicBillSection from '../features/bill/TopicBillSection';
import DonationContainer from '../features/donation/DonationContainer';
import MatchingContainer from '../features/matching/MatchingContainer';
import IdeologySection from '../features/ideology/IdeologySection';
import RecentBillSection from '../features/bill/RecentBillSection';

function LandingPage() {
    return (
        <div className={style.wrapper}>
            <LandingSearchBar />
            <TopicBillSection />
            <RecentBillSection />
            <IdeologySection />
            <div className={style.bottomSection}>
                <MatchingContainer />
                <DonationContainer />
            </div>
        </div>
    );
}

export default LandingPage;
