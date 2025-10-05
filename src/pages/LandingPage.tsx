import style from './styles/LandingPage.module.scss';
import topicImage from '../assets/yellowEnvelope.png';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className={style.wrapper}>
            <Link to="/landing" className={style.topicImageContainer}>
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
            </Link>
            <div className={style.contentsContainer}>
                <div className={style.contentsContainer__section}>
                    <Link to="/billlist" className={style.contentsContainer__title}>
                        최근 통과된 법안 확인하기
                    </Link>
                    <p className={style.contentsContainer__semiTitle}>
                        최근 통과된 법안을 확인해보세요
                    </p>
                </div>
                <div className={style.contentsContainer__section}>
                    <Link to="/member" className={style.contentsContainer__title}>
                        의원 살펴보기
                    </Link>
                    <p className={style.contentsContainer__semiTitle}>
                        국회의원의 상세 정보를 제공합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
