import { useBillFilterStore } from '../../store/billStore';
import style from './SortButton.module.scss';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SortType {
    name: string;
    direction: 'asc' | 'desc';
    sortBy: string;
}
const buttonData: SortType[] = [
    { name: '찬성 순', direction: 'desc', sortBy: 'yesTcnt' },
    { name: '반대 순', direction: 'desc', sortBy: 'noTcnt' },
    { name: '법안명 순', direction: 'desc', sortBy: 'billTitle' },
];

function BillSortButtons() {
    const filterState = useBillFilterStore((state) => state.filterState);
    const activeFilter = useBillFilterStore((state) => state.activeFilter);
    const { setFilterState, setActiveFilter } = useBillFilterStore();

    const handleSortChange = (item: SortType) => {
        if (activeFilter === item.sortBy) {
            const newDirection = filterState.direction === 'asc' ? 'desc' : 'asc';
            setFilterState({ ...filterState, direction: newDirection });
            return;
        }
        setActiveFilter(item.sortBy);
        setFilterState({ ...filterState, sortBy: item.sortBy, direction: item.direction });
    };
    return (
        <div className={style.buttonRail}>
            {buttonData.map((item) => (
                <button
                    className={`${style.button} ${
                        activeFilter === item.sortBy ? style.isActive : ''
                    }`}
                    key={item.name}
                    onClick={() => handleSortChange(item)}>
                    <span>{item.name}</span>
                    {item.sortBy === activeFilter ? (
                        filterState.direction === 'asc' ? (
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
