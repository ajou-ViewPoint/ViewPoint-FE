import style from './styles/DateFilter.module.scss';
import { Minus } from 'lucide-react';

function DateFilter() {
    return (
        <div className={style.container}>
            <p className={style.filterName}>발의 기간</p>
            <div className={style.inputSection}>
                <form>
                    <input type="date" className={style.dateInput}></input>
                </form>
                <Minus />
                <form>
                    <input
                        type="date"
                        className={style.dateInput}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                    />
                </form>
            </div>
        </div>
    );
}

export default DateFilter;
