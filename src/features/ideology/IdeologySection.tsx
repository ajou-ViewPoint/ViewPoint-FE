import NominateScatterPlot from '../../widgets/nominate/NominateScatterPlot';
import style from './IdeologySection.module.scss';
import { useNominateStore } from '../../store/nominateStore';

function IdeologySection() {
    const { setNominateAge } = useNominateStore();
    const nominateAge = useNominateStore((state) => state.nominateAge);

    const handleAgeChange = async (age: number) => {
        setNominateAge(age);
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>03.</p>
                <h2 className={style.header__title}>제22대 국회의원 이념 공간 beta</h2>
                <p className={style.header__discription}>
                    국회의원들의 이념 분포를 한눈에 확인하세요.
                </p>
                <div className={style.tagGrid}>
                    {Array.from({ length: 3 }, (_, i) => 22 - i).map((age) => (
                        <button
                            className={`${style.tag} ${nominateAge === age ? style.active : ''}`}
                            key={age}
                            value={age}
                            onClick={() => handleAgeChange(age)}>
                            {age === 1 ? '제헌' : age + '대'}
                        </button>
                    ))}
                </div>
            </div>
            <div className={style.contents}>
                <NominateScatterPlot />
            </div>
        </div>
    );
}

export default IdeologySection;
