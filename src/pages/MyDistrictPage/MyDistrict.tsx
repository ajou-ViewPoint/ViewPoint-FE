import ExampleDistricts from './ExampleDistricts';
import KoreaAdministrativeMap from './KoreaAdministrativeMap';
import style from './MyDistrict.module.scss';
import SearchSection from './SearchSection';
function MyDistrict() {
    return (
        <div className={style.pageWrapper}>
            <div className={style.wrapper}>
                <h1 className={style.title}>우리 지역구는 지금</h1>
                <ExampleDistricts />
                <SearchSection />
            </div>
            <KoreaAdministrativeMap />
        </div>
    );
}

export default MyDistrict;
