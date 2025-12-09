import { useEffect, useRef, useState } from 'react';
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
    const eracoState = useMemberStore((state) => state.memberListPagination.eraco);
    const keywordState = useMemberStore((state) => state.memberListPagination.keyword);
    const partyState = useMemberStore((state) => state.memberListPagination.party);
    const pageState = useMemberStore((state) => state.memberListPagination);
    const { getMemberList, setMemberListPage } = useMemberStore();
    const [currentAge, setCurrentAge] = useState(0);

    const handleAgeChange = (selectedAge: string, age: number) => {
        setCurrentAge(age);
        const eraco = age === 1 ? '제헌' : selectedAge;
        setMemberListPage({ ...pageState, pageNumber: 0, eraco: eraco });
    };

    useEffect(() => {
        getMemberList();
    }, [
        getMemberList,
        pageNumberState,
        sortDirectionState,
        sortByState,
        eracoState,
        partyState,
        keywordState,
    ]);

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>
                    대한민국{' '}
                    {currentAge > 0
                        ? `${currentAge === 1 ? '제헌국회' : currentAge + '대' + ''} `
                        : ''}
                    의원 모두보기
                </h1>
                <p className={style.header__discription}>
                    제22대 국회부터 제헌국회까지의 모든 국회의원 정보를 확인해보세요.
                </p>
            </div>
            <div className={style.tagGrid}>
                {Array.from({ length: 22 }, (_, i) => 22 - i).map((age) => (
                    <button
                        className={`${style.tag} ${currentAge === age ? style.active : ''}`}
                        key={age}
                        value={age}
                        onClick={() => handleAgeChange(`제${age}대`, age)}>
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
