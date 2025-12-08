import { useEffect, useRef } from 'react';
import MemberListCard from '../features/member/MemberListCard';
import { useMemberStore } from '../store/memberStore';
import style from './styles/MemberListPage.module.scss';
import Filter from '../features/filter/Filter';
import MemberSortButtons from '../widgets/sort/MemberSortButtons';
import MemberListPagination from '../widgets/pagination/MemberListPagination';

function MemberListPage() {
    const memberList = useMemberStore((state) => state.memberList);
    const memberListRef = useRef<HTMLDivElement>(null);
    const totalMemberElements = useMemberStore((state) => state.memberListPagination.totalElements);
    const pageNumberState = useMemberStore((state) => state.memberListPagination.pageNumber);
    const sortDirectionState = useMemberStore((state) => state.memberListPagination.direction);
    const sortByState = useMemberStore((state) => state.memberListPagination.sortBy);
    const { getMemberList } = useMemberStore();

    useEffect(() => {
        getMemberList();
    }, [getMemberList, pageNumberState, sortDirectionState, sortByState]);

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>대한민국 국회의원 모두보기</h1>
                <p className={style.header__discription}>
                    제22대 국회부터 제헌국회까지의 모든 국회의원 정보를 확인해보세요.
                </p>
            </div>
            <div className={style.tagGrid}>
                {Array.from({ length: 22 }, (_, i) => 22 - i).map((age) => (
                    <button className={style.tag} key={age} value={age} onClick={() => {}}>
                        {age === 1 ? '제헌' : age + '대'}
                    </button>
                ))}
            </div>
            <Filter selector="MEMBER" />
            <div className={style.resultHeader} ref={memberListRef}>
                <p className={style.resultHeader__count}>총 {totalMemberElements}명</p>
                <MemberSortButtons />
            </div>
            <div className={style.memberCardConatiner}>
                {memberList.map((member) => (
                    <MemberListCard key={member.memberId} member={member} />
                ))}
            </div>
            <MemberListPagination
                setScrollUp={() => {
                    memberListRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
            />
        </div>
    );
}

export default MemberListPage;
