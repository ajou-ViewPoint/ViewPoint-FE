import style from './styles/TermFilter.module.scss';
import { Minus } from 'lucide-react';
function TermFilter() {
    return (
        <div className={style.container}>
            <p className={style.filterName}>발의 대수</p>
            <div className={style.inputSection}>
                <select>
                    {Array.from({ length: 22 }, (_, i) => (
                        <option key={22 - i} value={22 - i}>
                            {22 - i === 1 ? '제헌국회' : `${22 - i}대`}
                        </option>
                    ))}
                </select>
                <Minus />
                <select>
                    {Array.from({ length: 22 }, (_, i) => (
                        <option key={22 - i} value={22 - i} className={style.term}>
                            {22 - i === 1 ? '제헌국회' : `${22 - i}대`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default TermFilter;
