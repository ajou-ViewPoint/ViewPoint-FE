import { useEffect, useState } from 'react';
import useBillVoteResultStore from '../../store/BillVoteResultStore';
import style from './VotingGroupsSection.module.scss';
import MemberListCard from '../../features/member/MemberListCard';

interface VotingGroupsSectionProps {
    /**billId는 ARC_xxx 형식입니다 */
    billId: string;
}

const buttons: { name: string; value: string; style: string }[] = [
    { name: '찬성', value: 'agree', style: style.agree },
    { name: '반대', value: 'disagree', style: style.disagree },
    { name: '기권', value: 'abstain', style: style.abstain },
    { name: '불참', value: 'absent', style: style.absent },
];
function VotingGroupsSection(props: VotingGroupsSectionProps) {
    const { getVoteResult } = useBillVoteResultStore();
    const voteResultMember = useBillVoteResultStore((state) => state.voteResultMember);
    const [memberVoteState, setMemberVoteState] = useState('agree');

    useEffect(() => {
        getVoteResult(props.billId);
    }, [getVoteResult, props.billId]);

    const VoteGroupSelector = () => {
        return (
            <div className={style.buttonRail}>
                {buttons.map((button) => (
                    <button
                        className={`${style.button} ${button.style}`}
                        onClick={() => setMemberVoteState(button.value)}>
                        {button.name}
                    </button>
                ))}
            </div>
        );
    };

    const MembersGrid = () => {
        return (
            <div className={style.grid}>
                {voteResultMember[memberVoteState]?.map((member, idx) => (
                    <MemberListCard key={idx} member={member} />
                ))}
            </div>
        );
    };
    return (
        <div className={style.wrapper}>
            <VoteGroupSelector />
            {voteResultMember[memberVoteState].length > 0 ? (
                <MembersGrid />
            ) : (
                <div className={style.resultCard}>
                    <dt>본회의 표결이 진행되지 않았습니다.</dt>
                </div>
            )}
        </div>
    );
}

export default VotingGroupsSection;
