import style from './styles/PartyFilter.module.scss';

const filters: string[] = [
    '전체',
    '더불어민주당',
    '국민의힘',
    '조국혁신당',
    '개혁신당',
    '진보당',
    '무소속',
];

type PartyFilterButtonProps = {
    partyName: string;
};

const PartyFilterButton = ({ partyName }: PartyFilterButtonProps) => {
    return <button className={style.button}>{partyName}</button>;
};
function PartyFilter() {
    return (
        <div className={style.container}>
            <p className={style.filterName}>발의 의원 정당</p>
            <div className={style.filterRail}>
                {filters.map((item) => (
                    <PartyFilterButton key={item} partyName={item} />
                ))}
            </div>
        </div>
    );
}

export default PartyFilter;
