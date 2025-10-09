import { useLocation } from 'react-router-dom';
import type { member } from '../../types/member';
import style from './MemberDetail.module.scss';
import dayjs from 'dayjs';

function MemberDetail() {
    const { state } = useLocation() as { state: member };

    const calculateAge = (birthDayString: string) => {
        const birthDate = dayjs(birthDayString);
        const today = dayjs();
        return today.diff(birthDate, 'year');
    };
    return (
        <div className={style.wrapper}>
            <h2>의원 상세</h2>
            <h3>정보</h3>
            <div className={style.infoContainer}>
                <img
                    className={style.infoContainer__profileImage}
                    src={state.profileImage}
                    alt={`${state.name} 의원의 프로필 사진`}
                />
                <div className={style.infoContainer__info}>
                    <p className={style.label}>이름</p>
                    <p className={style.label}>소속위원회</p>
                    <p className={style.value}>{state.name}</p>
                    <p className={style.value}>
                        {state.committeeId ? state.committeeId : '현직의원이 아닙니다'}
                    </p>
                    <p className={style.label}>나이</p>
                    <p className={style.label}>출석률</p>
                    <p className={style.value}>{calculateAge(state.birthDate)}</p>
                    <p className={style.value}>{state.attendanceRate}</p>
                    <p className={style.label}>정당</p>
                    <p className={style.label}>정당충성도</p>
                    <p className={style.value}>
                        {state.party.includes('/') ? state.party.split('/').pop() : state.party}
                    </p>
                    <p className={style.value}>{state.loyaltyRate}</p>
                    <p className={style.label}>당선 횟수</p>
                    <p className={style.label}>개인 점수</p>
                    <p className={style.value}>
                        {state.eraco.split(',').length === 1
                            ? '초선'
                            : state.eraco.split(',').length + '선'}
                    </p>
                    <p className={style.value}></p>
                    <p className={style.label}>선거구</p>
                    <p className={style.label}>소속 정당 의원 중앙값</p>
                    <p className={style.value}>{state.electionDistrict}</p>
                    <p className={style.value}></p>
                </div>
            </div>
            <h3>의안 투표 현황</h3>
            <div className={style.billContainer}></div>
        </div>
    );
}

export default MemberDetail;
