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
