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
            <div className={style.infoContainer}>
                <div className={style.columnWrapper}>
                    <img
                        className={style.infoContainer__profileImage}
                        src={member.profileImage ?? ''}
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
                        <p className={style.label}>소속위원회</p>

                        <p className={style.value}>
                            {/* {member.committeeId ? member.committeeId : '현직의원이 아닙니다'} */}
                            소속 위원회는 추후 추가 예정입니다.
                        </p>
                        <p className={style.label}>나이</p>
                        <p className={style.value}>{calculateAge(member.birthDate ?? '')}</p>
                        <p className={style.label}>정당</p>
                        <p className={style.value}>
                            {member.party.includes('/')
                                ? member.party.split('/').pop()
                                : member.party}
                        </p>
                        <p className={style.label}>당선 횟수</p>
                        <p className={style.value}>
                            n선
                            {/* {member.eraco.split(',').length === 1
                                ? '초선'
                                : member.eraco.split(',').length + '선'} */}
                        </p>
                        <p className={style.label}>선거구</p>
                        <p className={style.value}>{member.district}</p>
                    </div>
                </div>
            </div>
            <div className={style.scoreInfo}>
                <div className={style.scoreBox}>
                    <dd>99%</dd>
                    <dt>출석률</dt>
                </div>
                <div className={style.scoreBox}>
                    <dd>85</dd>
                    <dt>개인점수</dt>
                </div>
                <div className={style.scoreBox}>
                    <dd>98점</dd>
                    <dt>정당충성도</dt>
                </div>
                <div className={style.scoreBox}>
                    <dd>82</dd>
                    <dt>소속 정당 의원 충성도 중앙값</dt>
                </div>
            </div>
            <div className={style.wrapper}>
                <h2 className={style.sectionTitle}>
                    {member.name} 의원과 이념거리가 가까운 의원들
                </h2>
            </div>
            <div className={style.wrapper}>
                <h2 className={style.sectionTitle}>의안 투표 현황</h2>
                <div className={style.billContainer}></div>
            </div>
        </div>
    );
}

export default MemberDetail;
