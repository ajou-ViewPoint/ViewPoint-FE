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
    const navigate = useNavigate();
    const { getDistrictMembers, getRandomDistrict, getDistrictMembersByCoordinaite } =
        useMyDistrictStore();
    const regionCd = useMyDistrictStore((state) => state.selectedDistrictMembers[0].regionCd);

    const handleNavigation = async (regionCd: string) => {
        await getDistrictMembers('', '', regionCd);
        navigate(`/mydistrict/${regionCd}`);
    };

    const handleRandomNavigation = async () => {
        const randomDistrictID = await getRandomDistrict();
        await getDistrictMembers('', '', randomDistrictID.toString());
        navigate(`/mydistrict/${randomDistrictID}`);
    };

    const handleNavigateToDistrictDetailPage = async (longitude: number, latitude: number) => {
        await getDistrictMembersByCoordinaite(longitude, latitude).then(() =>
            navigate(`/mydistrict/${regionCd}`)
        );
    };
    const handleGeoLoaction = () => {
        if (!navigator.geolocation) {
            alert('이 브라우저에서는 위치 정보가 지원되지 않습니다.');
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            await handleNavigateToDistrictDetailPage(
                position.coords.longitude,
                position.coords.latitude
            );
        });
    };

    const RandomDistrictButton = () => {
        return (
            <div
                className={`${style.tag} ${style.randomButton}`}
                onClick={() => handleRandomNavigation()}>
                랜덤
            </div>
        );
    };

    const MyLocationDistrictButton = () => {
        return (
            <div className={`${style.tag} ${style.locationButton}`} onClick={handleGeoLoaction}>
                내 위치
            </div>
        );
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
                <RandomDistrictButton />
                <MyLocationDistrictButton />
            </div>
        </div>
    );
}

export default ExampleDistricts;
