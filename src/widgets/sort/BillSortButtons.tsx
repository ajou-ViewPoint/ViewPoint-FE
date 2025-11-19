import { useBillStore } from '../../store/billStore';
import style from './SortButton.module.scss';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface BillSortType {
    name: string;
    direction: 'asc' | 'desc';
    sortBy: string;
}
const buttonData: BillSortType[] = [
    { name: '찬성 순', direction: 'desc', sortBy: 'yesTcnt' },
    { name: '반대 순', direction: 'desc', sortBy: 'noTcnt' },
    { name: '법안명 순', direction: 'desc', sortBy: 'billTitle' },
    { name: '발의일자 순', direction: 'desc', sortBy: 'proposeDt' },
];

function BillSortButtons() {
    const { setPage } = useBillStore();
    const pageState = useBillStore((state) => state.billListPagination);

    const handleSortChange = (item: BillSortType) => {
        // 빠르게 두번 누르면 에러 발생 => prev로 이전 상태값 참조해서 하는게 나을듯
        // 정렬 방향을 바꾸는 경우
        if (pageState.sortBy === item.sortBy) {
            const newDirection = pageState.direction === 'asc' ? 'desc' : 'asc';
            setPage({ ...pageState, direction: newDirection });
            return;
        }
        // 정렬 기준을 바꾸는 경우
        setPage({ ...pageState, sortBy: item.sortBy });
    };
    return (
        <div className={style.buttonRail}>
            {buttonData.map((item) => (
                <button
                    className={`${style.button} ${
                        pageState.sortBy === item.sortBy ? style.isActive : ''
                    }`}
                    key={item.name}
                    onClick={() => handleSortChange(item)}>
                    <span>{item.name}</span>
                    {item.sortBy === pageState.sortBy ? (
                        pageState.direction === 'asc' ? (
                            <ArrowUp />
                        ) : (
                            <ArrowDown />
                        )
                    ) : (
                        ''
                    )}
                </button>
            ))}
        </div>
    );
}

export default BillSortButtons;
