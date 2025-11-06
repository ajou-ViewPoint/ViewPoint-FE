import style from './TopicBillSection.module.scss';
import topicImage from '../../assets/yellowEnvelope.png';

const mockTopicList = [
    { title: '근로기준법 일부개정법률안', member: '홍길동', date: '2024-05-10' },
    { title: '청년고용촉진특별법 일부개정법률안', member: '김영희', date: '2024-04-22' },
    { title: '여성폭력방지 및 피해자 보호 등에 관한 법률안', member: '이철수', date: '2024-03-15' },
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
                                src={topicImage}
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
