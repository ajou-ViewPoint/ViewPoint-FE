import style from './SectionContainer.module.scss';
import likeImg from '../../assets/Like.png';

function DonationContainer() {
    return (
        <div className={style.container} onClick={() => alert('후원 기능은 곧 제공될 예정입니다.')}>
            <p className={style.number}>06.</p>
            <div className={style.header}>
                <div className={style.wrapper}>
                    <h2 className={style.header__title}>후원하기</h2>
                    <p className={style.header__discription}>
                        ViewPoint는 국회 공개 데이터를 기반으로, 시민들에게 투명한 정치 정보를
                        제공합니다.
                    </p>
                </div>
                <img className={style.img} src={likeImg} alt="클립보드이미지" />
            </div>
        </div>
    );
}

export default DonationContainer;
