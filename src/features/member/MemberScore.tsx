import style from './MemberDetail.module.scss';

interface MemberScoreProps {
    attendanceRate: number;
    loyaltyRate: number;
}
function MemberScore({ attendanceRate, loyaltyRate }: MemberScoreProps) {
    return (
        <section className={style.wrapper__score}>
            <div className={style.scoreBox}>
                <dd>{attendanceRate ? attendanceRate : '제공 예정'}</dd>
                <dt>출석률</dt>
            </div>
            <div className={style.scoreBox}>
                <dd>{loyaltyRate ? loyaltyRate : '제공 예정'}</dd>
                <dt>정당충성도</dt>
            </div>
            <div className={style.scoreBox}>
                <dd>제공 예정</dd>
                <dt>소속 정당 의원 충성도 중앙값</dt>
            </div>
        </section>
    );
}

export default MemberScore;
