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
    // member 자체가 null/undefined인 경우 방어
    if (!member) {
        return null;
    }

    const getLast = (arr?: string[] | null) =>
        Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] ?? '' : '';

    const normalizedMember: BasicMemberInfo = {
        id: 'id' in member ? member.id : (member as unknown as Member).memberId,
        name: member?.name ?? '',
        party: 'party' in member ? member?.party ?? '' : getLast((member as Member)?.parties),
        profileImage: member?.profileImage ?? '',
        district:
            'regionName' in member
                ? (member as PartyMemberInfoProjection)?.regionName ?? ''
                : 'electionDistrict' in member
                ? getLast((member as Member)?.electionDistrict)
                : (member as unknown as MemberBasic)?.district ?? '',
    };

    const linkHref = normalizedMember.id ? `/members/${normalizedMember.id}` : '#';

    return (
        <Link to={linkHref} className={style.container}>
            <div className={style.imageWrapper}>
                <img
                    className={style.profileImage}
                    src={normalizedMember.profileImage || ''}
                    loading="lazy"
                    alt={`${normalizedMember.name || ''} 의원의 프로필 사진`}
                />
            </div>
            <div className={style.profileInfo}>
                <div className={style.rowWrapper}>
                    <h2 className={style.name}>{normalizedMember.name || ''}</h2>
                    <h3 className={style.party}>
                        {normalizedMember.party ? normalizedMember.party.split('/').pop() : ''}
                    </h3>
                </div>
                <h3 className={style.district}>
                    {normalizedMember.district ? normalizedMember.district.split('/').pop() : ''}
                </h3>
            </div>
        </Link>
    );
}

export default MemberListCard;
