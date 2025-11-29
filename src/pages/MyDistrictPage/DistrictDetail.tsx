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
                    {district.district} | {district.sidoName} {district.sggName}
                </h1>
                <section className={style.currentMember}>
                    <h2 className={style.sectionTitle}>현직 의원</h2>
                    <DistrictMemberCard
                        name={districtMembers[0].name}
                        memberId={districtMembers[0].memberId}
                        district={districtMembers[0].district}
                        age={districtMembers[0].age}
                        eraco={districtMembers[0].eraco}
                        party={districtMembers[0].party}
                        voteRate={districtMembers[0].voteRate}
                        profileImg={districtMembers[0].profileImage}
                    />
                </section>
                <section className={style.previousMembers}>
                    <h2 className={style.sectionTitle}>전직 의원</h2>
                    {districtMembers
                        .filter((member) => member.age != 22)
                        .map((member) => {
                            return (
                                <DistrictMemberCard
                                    key={member.memberId}
                                    name={member.name}
                                    memberId={member.memberId}
                                    district={member.district}
                                    eraco={member.eraco}
                                    age={member.age}
                                    party={member.party}
                                    voteRate={member.voteRate}
                                    profileImg={member.profileImage}
                                />
                            );
                        })}
                </section>
            </section>
            <section>
                <h2 className={style.sectionTitle}>{district.district} </h2>
                <DistrictMap />
            </section>
        </div>
    );
}

export default DistrictDetail;
