import style from './CommitteeMembersSection.module.scss';
import MemberListCard from '../../features/member/MemberListCard';
import type { CommitteeDetail, CommitteeMember } from '../../types/committee';

function CommitteeMembersSection(committeeDetail: CommitteeDetail) {
    return (
        <div>
            {['위원장', '간사', '위원'].map((role) =>
                committeeDetail.membersByRole[role] &&
                committeeDetail.membersByRole[role].length > 0 ? (
                    <div key={role}>
                        <h3 className={style.section__subtitle}>{role}</h3>
                        <div
                            className={`${style.wrapper} ${
                                role === '위원장'
                                    ? style.wrapper__single
                                    : role === '간사'
                                    ? style.wrapper__double
                                    : style.wrapper__triple
                            }`}>
                            {committeeDetail.membersByRole[role].map((member: CommitteeMember) => (
                                <MemberListCard key={member.memberId} member={member} />
                            ))}
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
}

export default CommitteeMembersSection;
