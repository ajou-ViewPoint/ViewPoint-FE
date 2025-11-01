import { useParams } from 'react-router-dom';
import style from './CommitteeDetailPage.module.scss';
import { useEffect } from 'react';
import Schedule from './Schedule';

const mockData = {
    name: '과학기술정보방송통신위원회',
    chairman: '박충권',
    schedule: '',
    chair: [
        ['국민의힘', 19],
        ['더불어민주당', 12],
        ['조국혁신당', 4],
        ['진보당', 3],
        ['무소속', 1],
    ],
    member: [],
};

function CommitteeDetailPage() {
    const params = useParams();

    useEffect(() => {}, []);

    return (
        <div className={style.wrapper}>
            <section className={style.section}>
                <div className={style.header}>
                    <h1 className={style.title}>{mockData.name}</h1>
                </div>
                <dl className={style.detail}>
                    <div className={style.detail__item}>
                        <dt>위원회 구성</dt>
                        <dd>위원장 1인, 간사 2인, 위원회 20인</dd>
                    </div>
                    <div className={style.detail__item}>
                        <dt>위원장</dt>
                        <dd>{mockData.chairman}</dd>
                    </div>
                </dl>
            </section>
            <section className={style.section}>
                <h2 className={style.section__title}>심사 일정</h2>
                <div className={style.section__wrapper}>
                    <Schedule />
                </div>
            </section>
            <section className={style.section}>
                <h2 className={style.section__title}>정당별 의석수</h2>
                <div className={style.section__wrapper}></div>
            </section>
            <section className={style.section}>
                <h2 className={style.section__title}>위원회 구성 의원</h2>
                <div className={style.section__wrapper}></div>
            </section>
        </div>
    );
}

export default CommitteeDetailPage;
