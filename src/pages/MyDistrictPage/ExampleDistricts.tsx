import { useNavigate } from 'react-router-dom';
import style from './ExampleDistricts.module.scss';
import { useMyDistrictStore } from '../../store/myDistrictStore';

interface MOCKTYPE {
    name: string;
    regionCd: string;
}

const mockDistricts: MOCKTYPE[] = [
    { name: '수원시 정', regionCd: '41117' },
    { name: '서울특별시 종로구', regionCd: '11110' },
];

function ExampleDistricts() {
    const nevigate = useNavigate();
    const { getDistrictMembers } = useMyDistrictStore();

    const handleNavigation = async (regionCd: string) => {
        await getDistrictMembers('', '', regionCd);
        nevigate(`/mydistrict/${regionCd}`);
    };
    return (
        <div className={style.wrapper}>
            <div className={style.tagGrid}>
                {mockDistricts.map((district) => (
                    <div
                        className={style.tag}
                        key={district.regionCd}
                        onClick={() => handleNavigation(district.regionCd)}>
                        {district.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExampleDistricts;
