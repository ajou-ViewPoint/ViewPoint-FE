import { useLocation, useParams } from 'react-router-dom';
import type { Member } from '../../types/member';
import style from './MemberDetail.module.scss';
import dayjs from 'dayjs';
import { useMemberStore } from '../../store/memberStore';
import { useEffect, useState } from 'react';
import sns_facebook from '../../assets/facebook.png';
import sns_instagram from '../../assets/insta.png';
import sns_x from '../../assets/x.png';
import sns_youtube from '../../assets/youtube.png';
import MemberVoteRecord from './MemberVoteRecord';
import MemberScore from './MemberScore';

function MemberDetail() {
    const { state } = useLocation() as { state: Member };
    const params = useParams();
    const { getMember } = useMemberStore();
    const [member, setMember] = useState<Member | null>(state ?? null);

    const calculateAge = (birthDayString: string) => {
        const birthDate = dayjs(birthDayString);
        const today = dayjs();
        return today.diff(birthDate, 'year');
    };

    useEffect(() => {
        if (!member && params.memberId) {
            const numericMemberId = Number(params.memberId);
            const fetchMember = async () => {
                const res = await getMember(numericMemberId);
                setMember(res);
            };
            fetchMember();
        }
    }, [member, params.memberId, getMember]);

    if (!member) return '';

    return (
        <div className={style.pageWrapper}>
            <section className={style.infoContainer}>
                <div className={style.columnWrapper}>
                    <img
                        className={style.infoContainer__profileImage}
                        src={member.profileImage}
                        alt={`${member.name} 의원의 프로필 사진`}
                    />
                    <div className={style.snsButtonRail}>
                        <button className={style.snsButton}>
                            <img src={sns_instagram} />
                        </button>
                        <button className={style.snsButton}>
                            <img src={sns_youtube} />
                        </button>
                        <button className={style.snsButton}>
                            <img src={sns_x} />
                        </button>
                        <button className={style.snsButton}>
                            <img src={sns_facebook} />
                        </button>
                    </div>
                </div>
                <div className={style.wrapper__info}>
                    <p className={style.value__name}>{member.name}</p>
                    <p className={style.value__engChName}>
                        {member.chName} {member.engName ? ' | ' : ''} {member.engName}
                    </p>
                    <div className={style.infoContainer__info}>
                        <p className={style.label}>
                            {member.committees && member.committees.length > 0 ? '소속위원회' : ''}
                        </p>

                        <p className={style.value}>
                            {member.committees && member.committees.length > 0
                                ? member.committees[member.committees.length - 1].committeeName ??
                                  ''
                                : ''}
                        </p>
                        <p className={style.label}>나이</p>
                        <p className={style.value}>{calculateAge(member.birthDate ?? '')}</p>
                        <p className={style.label}>정당</p>
                        <p className={style.value}>{member.parties[member.parties.length - 1]}</p>
                        <p className={style.label}>당선 횟수</p>
                        <p className={style.value}>
                            {member.eraco.length > 1 ? member.eraco.length + '선' : '초선'}
                        </p>
                        <p className={style.label}>선거구</p>
                        <p className={style.value}>
                            {member.electionDistrict[member.electionDistrict.length - 1]}
                        </p>
                    </div>
                </div>
            </section>
            <MemberScore attendanceRate={member.attendanceRate} loyaltyRate={member.loyaltyRate} />
            {/* 
            <section className={style.section}>
                <h2 className={style.sectionTitle}>
                    {member.name} 의원과 이념거리가 가까운 의원들
                </h2>
                <div className={style.wrapper}></div>
            </section> */}
            <section className={style.section}>
                <h2 className={style.sectionTitle}>의안 투표 현황</h2>
                <div className={style.wrapper}>
                    <MemberVoteRecord />
                </div>
            </section>
        </div>
    );
}

export default MemberDetail;
