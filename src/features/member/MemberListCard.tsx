import style from './MemberListCard.module.scss';
import type { member } from '../../types/member';
import { Link } from 'react-router-dom';

function MemberListCard(member: member) {
    return (
        <Link to={`/members/${member.id}`} className={style.container} state={member}>
            <img
                className={style.profileImage}
                src={member.profileImage}
                alt={`${member.name} 의원의 프로필 사진`}
            />
            <div className={style.profileInfo}>
                <h2 className={style.name}>{member.name}</h2>
                <h3 className={style.party}>{member.party}</h3>
            </div>
        </Link>
    );
}

export default MemberListCard;
