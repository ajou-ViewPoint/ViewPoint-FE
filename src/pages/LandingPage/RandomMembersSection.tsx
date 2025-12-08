import { useMemberStore } from '../../store/memberStore';
import style from './RandomMembersSection.module.scss';
import MemberListCard from '../../features/member/MemberListCard';

function RandomMembersSection() {
    const members = useMemberStore((state) => state.randomMemberList);
    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>04.</p>
                <h2 className={style.header__title}>무작위 국회의원 소개!</h2>
                <p className={style.header__discription}>
                    그동안 잘 몰랐던 의원들도 함께 발견해보면 어떨까요?
                </p>
            </div>
            <div className={style.memberGrid}>
                {members.slice(0, 5).map((member) => (
                    <MemberListCard key={member.memberId} member={member} />
                ))}
            </div>
        </div>
    );
}

export default RandomMembersSection;
