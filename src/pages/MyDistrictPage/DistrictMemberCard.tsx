import { Link } from 'react-router-dom';
import style from './DistrictMemberCard.module.scss';

interface DistrictMemberCardProps {
    name: string;
    memberId: number;
    district: string;
    party: string;
    eraco: string;
    voteRate: number;
    profileImg: string | null;
}
function DistrictMemberCard(prop: DistrictMemberCardProps) {
    const voteRateStyler = (voteRate: number) => {
        const value = voteRate / 10;
        if (value < 4.5) {
            return style.low;
        }
        if (value >= 4.5 && value < 5.5) {
            return style.medium;
        }
        if (value >= 5.5 && value < 6.5) {
            return style.high;
        }
        if (value >= 6.5) {
            return style.veryHigh;
        }
        return '';
    };
    return (
        <Link to={`/members/${prop.memberId}`} className={style.container}>
            <div className={style.infoSection}>
                <div className={style.rowWrapper}>
                    <h1 className={style.name}>{prop.name}</h1>
                    <h2 className={style.party}>{prop.party}</h2>
                    <h2 className={style.eraco}>{prop.eraco}</h2>
                </div>
                <p className={style.district}>{prop.district}</p>
                <p className={`${style.voteRate} ${voteRateStyler(prop.voteRate)}`}>
                    득표율: {prop.voteRate}%
                </p>
            </div>
            <img className={style.profileImg} src={prop.profileImg ?? ''} />
        </Link>
    );
}

export default DistrictMemberCard;
