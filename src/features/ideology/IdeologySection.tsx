import style from './IdeologySection.module.scss';

function IdeologySection() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>03.</p>
                <h2 className={style.header__title}>국회의원 이념 분포</h2>
                <p className={style.header__discription}>
                    국회의원들의 이념 점수를 한눈에 확인하세요.
                </p>
            </div>
            <div className={style.contents}></div>
        </div>
    );
}

export default IdeologySection;
