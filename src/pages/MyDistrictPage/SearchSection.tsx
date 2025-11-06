// import { useState } from 'react';
import style from './SearchSection.module.scss';
import { Locate } from 'lucide-react';
// import DaumPostcodeEmbed from 'react-daum-postcode';
function SearchSection() {
    // const [loading, setLoading] = useState(false);
    // const [address, setAddress] = useState('');

    // const Postcode = () => {
    //     const handleComplete = (data) => {
    //         let fullAddress = data.address;
    //         let extraAddress = '';

    //         if (data.addressType === 'R') {
    //             if (data.bname !== '') {
    //                 extraAddress += data.bname;
    //             }
    //             if (data.buildingName !== '') {
    //                 extraAddress +=
    //                     extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    //             }
    //             fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    //         }

    //         console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    //     };

    //     return <DaumPostcodeEmbed onComplete={handleComplete} {...props} />;
    // };
    // const handleGeoLoaction = () => {
    //     if (!navigator.geolocation) {
    //         alert('이 브라우저에서는 위치 정보가 지원되지 않습니다.');
    //         return;
    //     }
    //     navigator.geolocation.getCurrentPosition(
    //         async (position) => {
    //             const { latitude, longitude } = position.coords;

    //             try {
    //                 // 주소 변환 (OpenStreetMap Nominatim API 예시)
    //                 // const res = await fetch(
    //                 //     `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    //                 // );

    //                 alert(`${latitude}, ${longitude}`);

    //                 setAddress('fullAddress');

    //                 // // 서버에 주소 전송
    //                 // await fetch('/api/location', {
    //                 //     method: 'POST',
    //                 //     headers: { 'Content-Type': 'application/json' },
    //                 //     body: JSON.stringify({ address: fullAddress }),
    //                 // });
    //             } catch (error) {
    //                 console.error(error);
    //                 alert('주소 변환 중 오류가 발생했습니다.');
    //             } finally {
    //                 setLoading(false);
    //             }
    //         },
    //         (error) => {
    //             console.error(error);
    //             alert('위치 정보를 가져올 수 없습니다.');
    //             setLoading(false);
    //         }
    //     );
    // };
    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>주소를 입력하거나 현재 위치를 불러오세요</h2>
            <section className={style.searchSection}>
                <form>
                    <input
                        placeholder="예시: 경기도 수원시 영통구 월드컵로 206"
                        className={style.searchInput}
                    />
                </form>

                <button className={style.gpsButton} onClick={() => {}}>
                    <Locate />
                </button>
            </section>
        </div>
    );
}

export default SearchSection;
