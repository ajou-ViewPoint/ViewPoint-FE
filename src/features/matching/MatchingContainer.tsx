import style from '../donation/SectionContainer.module.scss';
import clipboardImg from '../../assets/Clipboard.png';

function MatchingContainer() {
    return (
        <div
            className={style.container}
            onClick={() => alert('의원 매칭 기능은 곧 제공될 예정입니다.')}>
            <p className={style.number}>05.</p>
            <div className={style.header}>
                <div className={style.wrapper}>
                    <h2 className={style.header__title}>나와 가까운 의원 찾기</h2>
                    <p className={style.header__discription}>
                        간단한 테스트를 통해 정책 선호도를 분석하여 이념적으로 가까운 국회의원을
                        추천해드려요.
                    </p>
                </div>
                <img className={style.img} src={clipboardImg} alt="클립보드이미지" />
            </div>
        </div>
    );
}

export default MatchingContainer;
