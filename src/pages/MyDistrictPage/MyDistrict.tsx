import ExampleDistricts from './ExampleDistricts';
import KoreaAdministrativeMap from './KoreaAdministrativeMap';
import style from './MyDistrict.module.scss';
import SearchSection from './SearchSection';
function MyDistrict() {
    return (
        <div className={style.pageWrapper}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h1 className={style.header__title}>우리 지역구는 지금</h1>
                </div>
                <ExampleDistricts />
                <SearchSection />
            </div>
            <KoreaAdministrativeMap />
        </div>
    );
}

export default MyDistrict;
