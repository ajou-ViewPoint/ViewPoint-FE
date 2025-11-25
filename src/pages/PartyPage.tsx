import { useNavigate } from 'react-router-dom';
import style from './styles/PartyPage.module.scss';
import { usePartyStore } from '../store/partyStore';

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
    const navigate = useNavigate();
    const { getSelectedPartyMembers } = usePartyStore();
    const handleNavigateToPartyDetailPage = async (partyName: string, path: number) => {
        await getSelectedPartyMembers(partyName, '제22대');
        navigate(`/party/${path}`);
    };
    return (
        <div className={style.pageWrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>정당</h1>
                <p className={style.header__discription}>제22대 국회 원내정당입니다.</p>
            </div>
            <div className={style.buttonGrid}>
                {currentPartyList.map(({ partyName, path }) => (
                    <button
                        key={path}
                        className={style.button}
                        style={{
                            backgroundImage: `url(/assets/partyLogo/${path}.svg)`,
                        }}
                        onClick={() => handleNavigateToPartyDetailPage(partyName, path)}>
                        {partyName}
                    </button>
                ))}
            </div>
            <div className={style.infographic}></div>
        </div>
    );
}

export default PartyPage;
