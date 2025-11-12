import { useEffect } from 'react';
import MemberListCard from '../features/member/MemberListCard';
import { useMemberStore } from '../store/memberStore';
import style from './styles/MemberListPage.module.scss';
import Filter from '../features/filter/Filter';
import MemberSortButtons from '../widgets/sort/MemberSortButtons';

function MemberListPage() {
    const memberList = useMemberStore((state) => state.memberList);
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
                <h1 className={style.header__title}>XX대 국회의원</h1>
            </div>
            <Filter />
            <div className={style.resultHeader}>
                <p className={style.resultHeader__count}>총 데이터 개수</p>
                <MemberSortButtons />
            </div>
            <div className={style.memberCardConatiner}>
                {memberList.map((member) => (
                    <MemberListCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}

export default MemberListPage;
