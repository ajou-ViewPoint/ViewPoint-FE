import { useNavigate } from 'react-router-dom';
import style from './styles/MobileUnsupportedPage.module.scss';

function MobileUnsupportedPage() {
    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h1 className={style.title}>모바일 버전은 준비 중이에요</h1>
                <p className={style.desc}>
                    ViewPoint는 지금 데스크톱 환경에 최적화되어 있어요. 더 좋은 모바일 경험을
                    제공하기 위해 열심히 준비 중입니다. 조금만 기다려 주세요!
                </p>
                <button className={style.action} onClick={() => navigate('/')}>
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default MobileUnsupportedPage;
