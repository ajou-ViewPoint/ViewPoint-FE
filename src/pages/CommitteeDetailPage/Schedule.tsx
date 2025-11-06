// import { useCommitteeStore } from '../../store/committeeStore';
import style from './Schedule.module.scss';

const mockData = [
    {
        status: '예정',
        name: '제429회국회(정기회) 제2차 전체회의',
        date: '2025-09-04 10:00',
        type: '전체회의',
    },
    {
        status: '예정',
        name: '제429회국회(정기회) 제1차 소의원회',
        date: '2025-09-03 14:00',
        type: '소의원회',
    },
    {
        status: '종료',
        name: '제428회국회(임시회) 제5차 전체회의',
        date: '2025-08-28 09:00',
        type: '전체회의',
    },
    {
        status: '종료',
        name: '제428회국회(임시회) 제4차 소의원회',
        date: '2025-08-27 15:00',
        type: '소의원회',
    },
    {
        status: '종료',
        name: '제428회국회(임시회) 제3차 전체회의',
        date: '2025-08-20 10:00',
        type: '전체회의',
    },
];

function Schedule() {
    // const committee = useCommitteeStore((state) => state.selectedCommittee);
    return (
        <div className={style.wrapper}>
            <h3 className={style.header}>2025년 9월 4일</h3>
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
