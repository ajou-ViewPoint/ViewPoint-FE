import style from './SearchSection.module.scss';
import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';
import { useMyDistrictStore } from '../../store/myDistrictStore';
import { useNavigate } from 'react-router-dom';
function SearchSection() {
    const { getDistrictMembers } = useMyDistrictStore();
    const navigate = useNavigate();

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

    return (
        <div className={style.wrapper}>
            <Postcode />
        </div>
    );
}

export default SearchSection;
