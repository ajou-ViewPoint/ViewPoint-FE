import style from './SearchSection.module.scss';
import { Locate } from 'lucide-react';
import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';
import { useMyDistrictStore } from '../../store/myDistrictStore';
import { useNavigate } from 'react-router-dom';
function SearchSection() {
    const { getDistrictMembers, getDistrictMembersByCoordinaite } = useMyDistrictStore();
    const regionCd = useMyDistrictStore((state) => state.selectedDistrictMembers[0].regionCd);
    const navigate = useNavigate();

    const handleNavigateToDistrictDetailPage = async (longitude: number, latitude: number) => {
        await getDistrictMembersByCoordinaite(longitude, latitude).then(() =>
            navigate(`/mydistrict/${regionCd}`)
        );
    };

    const Postcode = () => {
        const handleComplete = async (data: Address) => {
            await getDistrictMembers('', '', data.sigunguCode);
            navigate(`/mydistrict/${data.sigunguCode}`);
        };

        return (
            <DaumPostcodeEmbed
                style={{ width: '100%', height: '500px' }}
                onComplete={handleComplete}
            />
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

    return (
        <div className={style.wrapper}>
            <Postcode />
            <button className={style.gpsButton} onClick={handleGeoLoaction}>
                <Locate />
            </button>
        </div>
    );
}

export default SearchSection;
