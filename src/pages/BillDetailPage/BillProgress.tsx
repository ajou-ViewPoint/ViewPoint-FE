import style from './BillProgress.module.scss';
import { ChevronRight } from 'lucide-react';

function BillProgress() {
    return (
        // 만약 해당 단계의 날짜가 존재한다면 그 단계는 지난 것임
        // 가장 마지막 단계에 해당하는 날짜에만 버튼의 효과를 지정해야함
        // 처리 날짜가 존재하지 않는 데이터는 아직 도달하지 않은 상태
        // 도달하지 않은 상태 중 가장 앞에 있는 단계는 현재 단계임
        // 폐기 상태이면 폐기 상태 활성화
        <div className={style.progressRail}>
            <p>접수</p>
            <ChevronRight />
            <p>위원회 심사</p>
            <ChevronRight />
            <p>체계자구 심사</p>
            <ChevronRight />
            <p>본회의 심의</p>
            <ChevronRight />
            <p>정부 이송</p>
            <ChevronRight />
            <p>공포</p>
            <ChevronRight />
        </div>
    );
}

export default BillProgress;
