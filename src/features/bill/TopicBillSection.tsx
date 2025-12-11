import style from './TopicBillSection.module.scss';
import topicImage from '../../assets/yellowEnvelope.png';
import topicImage4 from '../../assets/topicImage4.png';
import topicImage5 from '../../assets/topicImage5.png';
import topicImage2 from '../../assets/steelLaw.png';
import { useNavigate } from 'react-router-dom';
import { useBillStore } from '../../store/billStore';

const mockTopicList = [
    {
        title: '노동조합 및 노동관계조정법 일부개정법률안(대안)',
        member: '환경노동위원장',
        date: '2025-08-01',
        image: topicImage,
        billId: 'PRC_W2O5V0N7I2N8G1J9L0H0Q4K2K0U3V6',
    },
    {
        title: '국가보안법 폐지법률안',
        member: '민형배의원 등 31인',
        date: '2025-12-02',
        image: topicImage4,
        billId: 'PRC_X2Y5W1X1S1T7R1Q0Q1O5P3X6Y1W7W0',
    },
    {
        title: '철강산업 경쟁력 강화 및 탄소중립 전환을 위한 특별법안(대안)',
        member: '산업통상자원중소벤처기업위원장',
        date: '2025-11-19',
        image: topicImage2,
        billId: 'PRC_A2L5O1S1N1X9N1D8W5J8E0X6D5U0P5',
    },
    {
        title: '쌀가공산업 육성 및 쌀 이용 촉진에 관한 법률 일부개정법률안',
        member: '이만희의원 등 11인',
        date: '2025-11-30',
        image: topicImage5,
        billId: 'PRC_Q2Q5P1P1X0Y4W1U5V3T3U5P1Q4P6P9',
    },
];

function TopicBillSection() {
    const navigate = useNavigate();
    const { getSelectedBill } = useBillStore();

    const handleNavigateToBillDetailPage = async (billId: string) => {
        await getSelectedBill(billId);
        navigate(`/billlist/${billId}`);
    };
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
                <a
                    className={style.contents__main}
                    onClick={() => handleNavigateToBillDetailPage(mockTopicList[0].billId)}>
                    <img className={style.topicImage} src={topicImage} alt="토픽 이미지" />
                    <p className={style.topicImage__caption}>{mockTopicList[0].title}</p>
                </a>
                <div className={style.contents__list}>
                    {mockTopicList.slice(1).map((item) => (
                        <div
                            className={style.contents__item}
                            key={item.title}
                            onClick={() => handleNavigateToBillDetailPage(item.billId)}>
                            <div className={style.contents__wrapper}>
                                <h3 className={style.contents__item__title}>{item.title}</h3>
                                <p className={style.contents__item__discription}>{item.member}</p>
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
