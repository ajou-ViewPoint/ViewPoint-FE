import style from './MemberListCard.module.scss';
import type { Member, MemberBasic, PartyMemberInfoProjection } from '../../types/member';
import { Link } from 'react-router-dom';
import type { CommitteeMember } from '../../types/committee';
import type { VoteMember } from '../../store/BillVoteResultStore';

type MemberListCardProps = {
    member: Member | PartyMemberInfoProjection | CommitteeMember | VoteMember;
};
interface BasicMemberInfo {
    id: number;
    name: string;
    party: string;
    profileImage: string;
    district: string;
}

function MemberListCard({ member }: MemberListCardProps) {
    const normalizedMember: BasicMemberInfo = {
        id: 'id' in member ? member.id : member.memberId,
        name: member.name,
        party:
            'party' in member
                ? member.party ?? ''
                : (member as Member).parties[(member as Member).parties.length - 1] ?? '',
        profileImage: member.profileImage ?? '',
        district:
            'regionName' in member
                ? (member as PartyMemberInfoProjection).regionName ?? ''
                : 'electionDistrict' in member
                ? (member as Member).electionDistrict[
                      (member as Member).electionDistrict.length - 1
                  ] ?? ''
                : (member as unknown as MemberBasic).district,
    };
    return (
        <Link to={`/members/${normalizedMember.id}`} className={style.container}>
            <div className={style.imageWrapper}>
                <img
                    className={style.profileImage}
                    src={normalizedMember.profileImage}
                    loading="lazy"
                    alt={`${normalizedMember.name} 의원의 프로필 사진`}
                />
            </div>
            <div className={style.profileInfo}>
                <div className={style.rowWrapper}>
                    <h2 className={style.name}>{normalizedMember.name}</h2>
                    <h3 className={style.party}>{normalizedMember.party.split('/').pop()}</h3>
                </div>
                <h3 className={style.district}>
                    {normalizedMember.district ? normalizedMember.district.split('/').pop() : ''}
                </h3>
            </div>
        </Link>
    );
}

export default MemberListCard;
