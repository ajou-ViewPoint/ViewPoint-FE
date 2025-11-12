import { useBillStore } from '../../store/billStore';
import style from './SortButton.module.scss';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface BillSortType {
    name: string;
    direction: 'asc' | 'desc';
    sortBy: string;
}

interface MemberSortType {
    name: string;
    direction: 'asc' | 'desc';
    sortBy: string;
}

interface SortButtonProp {
    selector: '의안' | '의원';
}

const buttonData: BillSortType[] = [
    { name: '찬성 순', direction: 'desc', sortBy: 'yesTcnt' },
    { name: '반대 순', direction: 'desc', sortBy: 'noTcnt' },
    { name: '법안명 순', direction: 'desc', sortBy: 'billTitle' },
    { name: '발의일자 순', direction: 'desc', sortBy: 'proposeDt' },
];

const memberButtonData: MemberSortType[] = [
    { name: '이름 순', direction: 'desc', sortBy: 'name' },
    { name: '정당충성도 순', direction: 'desc', sortBy: 'loyaltyRate' },
    { name: '출석률 순', direction: 'desc', sortBy: 'attendanceRate' },
    { name: '나이 순', direction: 'desc', sortBy: 'birthDate' },
];

function SortButtons(prop: SortButtonProp) {
    const { setPage } = useBillStore();
    const pageState = useBillStore((state) => state.billListPagination);

    const handleSortChange = (item: BillSortType) => {
        // 정렬 방향을 바꾸는 경우
        if (pageState.sortBy === item.sortBy) {
            const newDirection = item.direction === 'asc' ? 'desc' : 'asc';
            setPage({ ...pageState, direction: newDirection });
            return;
        }
        // 정렬 기준을 바꾸는 경우
        setPage({ ...pageState, sortBy: item.sortBy });
    };
    return (
        <div className={style.buttonRail}>
            {(prop.selector === '의안' ? buttonData : memberButtonData).map((item) => (
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

export default SortButtons;
