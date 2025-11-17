import { useEffect, useRef } from 'react';
import MemberListCard from '../features/member/MemberListCard';
import { useMemberStore } from '../store/memberStore';
import style from './styles/MemberListPage.module.scss';
import Filter from '../features/filter/Filter';
import MemberSortButtons from '../widgets/sort/MemberSortButtons';
import MemberListPagination from '../widgets/MemberListPagination';

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

    // 페이지 넘어갈 때 스크롤 위로 올리는 처리
    useEffect(() => {
        memberListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [pageNumberState, sortDirectionState, sortByState]);

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>XX대 국회의원</h1>
            </div>
            <Filter />
            <div className={style.resultHeader} ref={memberListRef}>
                <p className={style.resultHeader__count}>총 {totalMemberElements}명</p>
                <MemberSortButtons />
            </div>
            <div className={style.memberCardConatiner}>
                {memberList.map((member) => (
                    <MemberListCard key={member.id} member={member} />
                ))}
            </div>
            <MemberListPagination />
        </div>
    );
}

export default MemberListPage;
