import { useEffect, useRef } from 'react';
import { useMemberStore } from '../../store/memberStore';
import style from './MemberVoteRecord.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useBillStore } from '../../store/billStore';
import MemberVotePagination from './MemberVotePagination';

function MemberVoteRecord() {
    const voteRecord = useMemberStore((state) => state.memberVoteRecord);
    const { getMemberVoteRecord } = useMemberStore();
    const { getSelectedBill } = useBillStore();
    const param = useParams();
    const pageState = useMemberStore((state) => state.voteRecordPagination.pageNumber);
    const scrollPointRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const naviagteToBillPage = async (billId: string) => {
        await getSelectedBill(billId);
        navigate(`/billlist/${billId}`);
    };

    useEffect(() => {
        getMemberVoteRecord(param.memberId ?? '');
    }, [getMemberVoteRecord, param.memberId, pageState]);

    return (
        <div className={style.wrapper} ref={scrollPointRef}>
            <table aria-label="의원 투표 기록" className={style.table}>
                <thead>
                    <tr>
                        <th scope="col">의안 이름</th>
                        <th scope="col">날짜</th>
                        <th scope="col">투표 결과</th>
                    </tr>
                </thead>
                <tbody>
                    {voteRecord.map((record, idx) => (
                        <tr key={idx}>
                            <td
                                title={record.billTitle}
                                onClick={() => naviagteToBillPage(record.billId)}>
                                {record.billTitle}
                            </td>
                            <td>{record.voteDate}</td>
                            <td data-label={record.voteOpinion}>{record.voteOpinion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <MemberVotePagination
                setScrollUp={() => scrollPointRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
        </div>
    );
}

export default MemberVoteRecord;
