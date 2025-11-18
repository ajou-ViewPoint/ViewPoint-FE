import { useBillStore } from '../../store/billStore';
import style from './BillProgress.module.scss';
import { ChevronRight } from 'lucide-react';

function BillProgress() {
    const bill = useBillStore((state) => state.selectedBill);

    const steps = [
        {
            label: '접수',
            passed: !!bill.proposeDt,
        },
        {
            label: '위원회 심사',
            passed: !!bill.committeeSubmitDate,
        },
        { label: '체계자구 심사', passed: !!bill.lawSubmitDate },
        { label: '본회의 심의', passed: !!bill.rgsPresentDate },
    ];

    const lastPassedIndex = steps.map((step) => step.passed).lastIndexOf(true);
    return (
        // 만약 해당 단계의 날짜가 존재한다면 그 단계는 지난 것임
        // 가장 마지막 단계에 해당하는 날짜에만 버튼의 효과를 지정해야함
        // 처리 날짜가 존재하지 않는 데이터는 아직 도달하지 않은 상태
        // 도달하지 않은 상태 중 가장 앞에 있는 단계는 현재 단계임
        // 폐기 상태이면 폐기 상태 활성화

        <div className={style.wrapper}>
            {steps.map((step, idx) => (
                <div className={style.rowWrapper} key={idx}>
                    <p
                        className={`${style.badge} ${step.passed ? style.passed : ''} ${
                            idx === lastPassedIndex && step.passed ? style.current : ''
                        }`}>
                        {step.label}
                    </p>
                    <ChevronRight />
                </div>
            ))}
            <p className={style.badge}>정부 이송</p>
            <ChevronRight />
            <p className={style.badge}>공포 or 폐기</p>
        </div>
    );
}

export default BillProgress;
