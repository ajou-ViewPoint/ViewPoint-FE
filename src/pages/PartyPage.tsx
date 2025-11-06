import { Link } from 'react-router-dom';
import style from './styles/PartyPage.module.scss';

const currentPartyList = [
    { partyName: '더불어민주당', path: 25 },
    { partyName: '국민의힘', path: 34 },
    { partyName: '조국혁신당', path: 36 },
    { partyName: '진보당', path: 38 },
    { partyName: '개혁신당', path: 37 },
    { partyName: '기본소득당', path: 40 },
    { partyName: '사회민주당', path: 41 },
    { partyName: '무소속', path: 45 },
];
function PartyPage() {
    return (
        <div className={style.pageWrapper}>
            <section className={style.wrapper}>
                <h2>정당</h2>
                <div className={style.buttonGrid}>
                    {currentPartyList.map(({ partyName, path }) => (
                        <Link
                            key={path}
                            to={`/party/${path}`}
                            className={style.button}
                            state={{ partyName: partyName }}>
                            {partyName}
                        </Link>
                    ))}
                </div>
                <div className={style.infographic}></div>
            </section>
        </div>
    );
}

export default PartyPage;
