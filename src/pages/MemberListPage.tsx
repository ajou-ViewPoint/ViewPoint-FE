import { useEffect } from 'react';
import MemberListCard from '../features/member/MemberListCard';
import { useMemberFilterStore, useMemberStore } from '../store/memberStore';
import style from './styles/MemberListPage.module.scss';
import Filter from '../features/filter/Filter';

function MemberListPage() {
    const memberList = useMemberStore((state) => state.memberList);
    const filterState = useMemberFilterStore((state) => state.filterState);
    const { getMemberList } = useMemberStore();
    // const { setFilterState } = useMemberFilterStore();

    // const handleDirectionChange = (newDirection: string) => {
    //     setFilterState({ ...filterState, direction: newDirection, page: 0 });
    // };
    // const handleSortChange = (newSortBy: string) => {
    //     setFilterState({ ...filterState, sortBy: newSortBy, page: 0 });
    // };

    useEffect(() => {
        getMemberList();
    }, [getMemberList, filterState]);
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1 className={style.header__title}>XX대 국회의원</h1>
                <p className={style.header__discription}>22대 국회의원들입니다</p>
            </div>
            <Filter />
            {/* <div className={style.filterContainer}>
                <form>
                    <input type="text" aria-label="검색" placeholder="검색어를 입력하세요"></input>
                </form>
                <div className={style.filterButtonRail}>
                    <label>내림</label>
                    <button onClick={() => handleDirectionChange('desc')}></button>
                    <label>오름</label>
                    <button onClick={() => handleDirectionChange('asc')}></button>
                    <label>이름순</label>
                    <button onClick={() => handleSortChange('name')}></button>
                    <label>나이순</label>
                    <button onClick={() => handleSortChange('birthDate')}></button>
                </div>
            </div> */}
            <div className={style.memberCardConatiner}>
                {memberList.map((member) => (
                    <MemberListCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}

export default MemberListPage;
