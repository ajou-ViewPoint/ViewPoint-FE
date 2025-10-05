import { Link } from 'react-router-dom';
import style from './styles/PartyPage.module.scss';
function PartyPage() {
    return (
        <div className={style.wrapper}>
            <h2>정당</h2>
            <div className={style.buttonGrid}>
                <Link to="/party/dpk" className={style.button}>
                    더불어민주당
                </Link>
                <Link to="/party/ppp" className={style.button}>
                    국민의힘
                </Link>
                <Link to="/party/rkp" className={style.button}>
                    조국혁신당
                </Link>
                <Link to="/party/pp" className={style.button}>
                    진보당
                </Link>
                <Link to="/party/rp" className={style.button}>
                    개혁신당
                </Link>
                <Link to="/party/bip" className={style.button}>
                    기본소득당
                </Link>
                <Link to="/party/sdpk" className={style.button}>
                    사회민주당
                </Link>
                <Link to="/party/independent" className={style.button}>
                    무소속
                </Link>
            </div>
            <div className={style.infographic}></div>
        </div>
    );
}

export default PartyPage;
