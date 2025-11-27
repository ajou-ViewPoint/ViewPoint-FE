// import { useCommitteeStore } from '../../store/committeeStore';
import style from './Schedule.module.scss';

const mockData = [
    {
        status: '예정',
        name: '제429회 09차',
        date: '2025-11-26',
        type: '상임위원회',
    },
    {
        status: '예정',
        name: '제429회 08차',
        date: '2025-11-14',
        type: '상임위원회',
    },
    {
        status: '예정',
        name: '제429회 07차',
        date: '2025-11-11',
        type: '상임위원회',
    },
    {
        status: '예정',
        name: '제429회 국감 07차',
        date: '2025-10-30',
        type: '상임위원회',
    },
    {
        status: '예정',
        name: '제429회 국감 06차',
        date: '2025-10-28',
        type: '상임위원회',
    },
    {
        status: '예정',
        name: '제429회 국감 05차_지방1반',
        date: '2025-10-23',
        type: '소위원회',
    },
    {
        status: '예정',
        name: '제429회 국감 05차_지방2반',
        date: '2025-10-23',
        type: '소위원회',
    },
];

function Schedule() {
    // const committee = useCommitteeStore((state) => state.selectedCommittee);
    return (
        <div className={style.wrapper}>
            <h3 className={style.header}>2025년 10-11월</h3>
            {mockData.map((item) => (
                <div className={style.scheduleCard} key={item.name}>
                    <div className={style.scheduleCard__header}>
                        <p className={style.scheduleCard__tag}>{item.status}</p>
                        <p className={style.scheduleCard__name}>{item.name}</p>
                    </div>
                    <p className={style.scheduleCard__info}>
                        {item.date} | {item.type}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Schedule;
