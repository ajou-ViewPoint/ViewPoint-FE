import ExampleDistricts from './ExampleDistricts';
import style from './MyDistrict.module.scss';
import SearchSection from './SearchSection';
function MyDistrict() {
    return (
        <div className={style.pageWrapper}>
            <div className={style.wrapper}>
                <h1 className={style.title}>우리 지역구는 지금</h1>
                <SearchSection />
                <ExampleDistricts />
            </div>
            <div className={style.wrapper}>
                <h1 className={style.title}>지역구 리스트</h1>
            </div>
        </div>
    );
}

export default MyDistrict;
