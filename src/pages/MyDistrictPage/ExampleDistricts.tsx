import style from './ExampleDistricts.module.scss';

const mockDistricts: string[] = [
    '수원시 정',
    '서울특별시 강남구 갑',
    '서울특별시 종로구',
    '부산광역시 해운대구 을',
    '대구광역시 수성구 갑',
    '인천광역시 연수구 을',
    '광주광역시 서구 갑',
    '대전광역시 유성구 을',
    '울산광역시 남구 갑',
    '경기도 고양시 일산동구',
];

function ExampleDistricts() {
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>예시 지역구</h1>
            <div className={style.tagGrid}>
                {mockDistricts.map((district) => (
                    <div className={style.tag} key={district}>
                        {district}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExampleDistricts;
