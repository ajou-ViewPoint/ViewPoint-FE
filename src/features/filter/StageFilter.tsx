import style from './styles/StageFilter.module.scss';

const filters: string[] = ['전체', '발의', '위원회 심사', '본회의 상정', '가결', '부결', '폐기'];

type StageFilterButtonProps = {
    stage: string;
};

const StageFilterButton = ({ stage }: StageFilterButtonProps) => {
    return <button className={style.button}>{stage}</button>;
};
function StageFilter() {
    return (
        <div className={style.container}>
            <p className={style.filterName}>심사 단계</p>
            <div className={style.filterRail}>
                {filters.map((item) => (
                    <StageFilterButton key={item} stage={item} />
                ))}
            </div>
        </div>
    );
}

export default StageFilter;
