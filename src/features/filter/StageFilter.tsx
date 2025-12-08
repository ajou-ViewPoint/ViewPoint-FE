import { useBillStore } from '../../store/billStore';
import style from './styles/StageFilter.module.scss';

type StageFilterType =
    | '대안반영폐기'
    | '부결'
    | '불성립'
    | '수정가결'
    | '수정안반영폐기'
    | '원안가결'
    | '임기만료폐기'
    | '철회'
    | null
    | undefined;

const filters: string[] = [
    '대안반영폐기',
    '부결',
    '불성립',
    '수정가결',
    '수정안반영폐기',
    '원안가결',
    '임기만료폐기',
    '철회',
];

interface StageFilterButtonProps {
    stage: string;
}

const StageFilterButton = ({ stage }: StageFilterButtonProps) => {
    const stageState = useBillStore((state) => state.billListPagination.procResultCd);
    const pageState = useBillStore((state) => state.billListPagination);
    const { setPage } = useBillStore();
    const handleStageFilter = (stage: StageFilterType) => {
        setPage({ ...pageState, pageNumber: 0, procResultCd: stage });
    };
    return (
        <button
            className={`${style.button} ${stageState === stage ? style.active : ''}`}
            onClick={() => handleStageFilter(stage as StageFilterType)}>
            {stage}
        </button>
    );
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
