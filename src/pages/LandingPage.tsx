import style from './styles/LandingPage.module.scss';
import topicImage from '../assets/yellowEnvelope.png';
import { Link } from 'react-router-dom';
import LandingSearchBar from '../features/search/LandingSearchBar';
import TopicBillSection from '../features/bill/TopicBillSection';
import DonationContainer from '../features/donation/DonationContainer';

function LandingPage() {
    return (
        <div className={style.wrapper}>
            <LandingSearchBar />
            <TopicBillSection />
            <div className={style.bottomSection}>
                <DonationContainer />
            </div>
            {/* <Link to="/" className={style.topicImageContainer}>
                <div
                    className={style.topicImageContainer__image}
                    style={{ backgroundImage: `url(${topicImage})` }}></div>
                <h1 className={style.topicImageContainer__title}>
                    노동조합 및 노동관계조정법 일부개정법률안(대안)
                </h1>
                <div className={style.dots}>
                    <button className={style.dot}></button>
                    <button className={style.dot}></button>
                    <button className={style.dot}></button>
                </div>
            </Link> */}
        </div>
    );
}

export default LandingPage;
