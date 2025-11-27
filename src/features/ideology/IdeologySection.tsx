import NominateScatterPlot from '../../widgets/NominateScatterPlot';
import style from './IdeologySection.module.scss';

function IdeologySection() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>03.</p>
                <h2 className={style.header__title}>제22대 국회의원 이념 공간 beta</h2>
                <p className={style.header__discription}>
                    국회의원들의 이념 분포를 한눈에 확인하세요.
                </p>
            </div>
            <div className={style.contents}>
                <NominateScatterPlot />
            </div>
        </div>
    );
}

export default IdeologySection;
