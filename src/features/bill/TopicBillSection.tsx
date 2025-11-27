import style from './TopicBillSection.module.scss';
import topicImage from '../../assets/yellowEnvelope.png';
import topicImage1 from '../../assets/leaseLaw.png';
import topicImage2 from '../../assets/steelLaw.png';
import topicImage3 from '../../assets/image3.png';

const mockTopicList = [
    {
        title: '주택임대차보호법 일부개정법률안(한창민의원 등 10인)',
        member: '한창민의원 등 10인',
        date: '2025-10-02',
        image: topicImage1,
    },
    {
        title: '철강산업 경쟁력 강화 및 탄소중립 전환을 위한 특별법안(대안)',
        member: '산업통상자원중소벤처기업위원장',
        date: '2025-11-19',
        image: topicImage2,
    },
    {
        title: '전자금융거래법 일부개정법률안(대안)',
        member: '정무위원장',
        date: '2025-07-30',
        image: topicImage3,
    },
];

function TopicBillSection() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>01.</p>
                <h2 className={style.header__title}>주목받고 있는 의안 소식</h2>
                <p className={style.header__discription}>
                    최근 주목받고 있는 토픽 의안들을 확인해보세요
                </p>
            </div>
            <div className={style.contents}>
                <a className={style.contents__main}>
                    <img className={style.topicImage} src={topicImage} alt="토픽 이미지" />
                    <p className={style.topicImage__caption}>
                        노동조합 및 노동관계조정법 일부개정법률안(대안)
                    </p>
                </a>
                <div className={style.contents__list}>
                    {mockTopicList.map((item) => (
                        <div className={style.contents__item} key={item.title}>
                            <div className={style.contents__wrapper}>
                                <h3 className={style.contents__item__title}>{item.title}</h3>
                                <p className={style.contents__item__discription}>
                                    {item.member} | {item.date}
                                </p>
                            </div>
                            <img
                                className={style.listTopicImage}
                                src={item.image}
                                alt="토픽 이미지"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopicBillSection;
