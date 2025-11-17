import { useParams } from 'react-router-dom';
import style from './DistrictDetail.module.scss';
import { useEffect } from 'react';
import { DEFAULT_DISTRICT_MEMBER, useMyDistrictStore } from '../../store/myDistrictStore';
import DistrictMemberCard from './DistrictMemberCard';
import DistrictMap from './DistrictMap';
function DistrictDetail() {
    const { getDistrictMembers } = useMyDistrictStore();
    const district = useMyDistrictStore((state) => state.selectedDistrict);
    const districtMembers = useMyDistrictStore((state) => state.selectedDistrictMembers);
    const params = useParams();

    useEffect(() => {
        if (districtMembers[0] === DEFAULT_DISTRICT_MEMBER) {
            getDistrictMembers('', '', params.regionCd);
        }
    }, [getDistrictMembers, params.regionCd, districtMembers]);

    return (
        <div className={style.pageWrapper}>
            <section>
                <h1 className={style.header}>
                    {district.electionDistrict} | {district.sidoName} {district.sggName}
                </h1>
                <section className={style.currentMember}>
                    <h2 className={style.sectionTitle}>현직 의원</h2>
                    <DistrictMemberCard
                        name={districtMembers[0].memberName}
                        memberId={districtMembers[0].memberId}
                        district={districtMembers[0].electionDistrict}
                        eraco={districtMembers[0].eraco}
                        party={districtMembers[0].partyName}
                        voteRate={districtMembers[0].voteRate}
                        profileImg={districtMembers[0].profileImage}
                    />
                </section>
                <section className={style.previousMembers}>
                    <h2 className={style.sectionTitle}>전직 의원</h2>
                    {districtMembers
                        .filter((member) => member.eraco != '제22대')
                        .map((member) => (
                            <DistrictMemberCard
                                key={member.memberName}
                                name={member.memberName}
                                memberId={member.memberId}
                                district={member.electionDistrict}
                                eraco={member.eraco}
                                party={member.partyName}
                                voteRate={member.voteRate}
                                profileImg={member.profileImage}
                            />
                        ))}
                </section>
            </section>
            <section>
                <h2 className={style.sectionTitle}>{district.electionDistrict} </h2>
                <DistrictMap />
            </section>
        </div>
    );
}

export default DistrictDetail;
