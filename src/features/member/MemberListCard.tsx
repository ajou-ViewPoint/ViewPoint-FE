import style from './MemberListCard.module.scss';
import type { Member, PartyMemberInfoProjection } from '../../types/member';
import { Link } from 'react-router-dom';
import type { CommitteeMember } from '../../types/committee';
import type { VoteMember } from '../../store/BillVoteResultStore';

type MemberListCardProps = {
    member: Member | PartyMemberInfoProjection | CommitteeMember | VoteMember; // 추후 삭제할 것, 백이 정보 다 쏴줘야함
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
        party: 'partyName' in member ? member.partyName ?? '' : (member as Member).party ?? '',
        profileImage: member.profileImage ?? '',
        district:
            'regionName' in member
                ? (member as PartyMemberInfoProjection).regionName ?? ''
                : (member as Member).electionDistrict ?? '',
    };
    return (
        <Link to={`/members/${normalizedMember.id}`} className={style.container}>
            <div className={style.imageWrapper}>
                <img
                    className={style.profileImage}
                    src={normalizedMember.profileImage}
                    alt={`${normalizedMember.name} 의원의 프로필 사진`}
                />
            </div>
            <div className={style.profileInfo}>
                <div className={style.rowWrapper}>
                    <h2 className={style.name}>{normalizedMember.name}</h2>
                    <h3 className={style.party}>{normalizedMember.party.split('/').pop()}</h3>
                </div>
                <h3 className={style.district}>{normalizedMember.district.split('/').pop()}</h3>
            </div>
        </Link>
    );
}

export default MemberListCard;
