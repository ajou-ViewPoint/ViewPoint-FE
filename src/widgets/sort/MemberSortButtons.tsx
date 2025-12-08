import { ArrowDown, ArrowUp } from 'lucide-react';
import style from './SortButton.module.scss';
import { useMemberStore } from '../../store/memberStore';

interface MemberSortType {
    name: string;
    direction: 'asc' | 'desc';
    sortBy: string;
}
const buttonData: MemberSortType[] = [
    { name: '대수 순', direction: 'desc', sortBy: 'age' },
    { name: '정당충성도 순', direction: 'desc', sortBy: 'loyaltyRate' },
    { name: '출석률 순', direction: 'desc', sortBy: 'attendanceRate' },
    { name: '나이 순', direction: 'desc', sortBy: 'birthDate' },
];

function MemberSortButtons() {
    const { setMemberListPage } = useMemberStore();
    const pageState = useMemberStore((state) => state.memberListPagination);

    const handleSortChange = (item: MemberSortType) => {
        // 정렬 방향을 바꾸는 경우
        if (pageState.sortBy === item.sortBy) {
            const newDirection = pageState.direction === 'asc' ? 'desc' : 'asc';
            setMemberListPage({ ...pageState, pageNumber: 0, direction: newDirection });
            return;
        }
        // 정렬 기준을 바꾸는 경우
        setMemberListPage({ ...pageState, pageNumber: 0, sortBy: item.sortBy });
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

export default MemberSortButtons;
