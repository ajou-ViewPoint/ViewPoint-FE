import RecentBillCard from './RecentBillCard';
import style from './RecentBillSection.module.scss';
import type { bill } from '../../types/bill';

const mockBills: bill[] = [
    {
        id: 73131,
        billTitle: '이스포츠(전자스포츠) 진흥에 관한 법률 일부개정법률안(강유정의원 등 10인)',
        proposer: '강유정의원 등 10인',
        voteTcnt: 210,
        yesTcnt: 210,
        noTcnt: null,
        blankTcnt: null,
        billSummary:
            '제안이유 및 주요내용 불안정한 지위로 인해 인력들이 불합리한 대우를 받지 않게 보호하자는 취지로 만들어진 표준계약서는 법적 구속성이 없어 분야별 표준계약서가 만들어져 있음에도 불구하고 사용률이 저조한 상황임. 「2021년 콘텐츠산업 10대 불공정행위 실태조사」에 따르면 문화체육관광부에서 고시하고 있는 표준계약서를 활용하거나 사안별로 활용하고 있는 비율은 42.6%이고, 구두계약만 진행하는 경우도 18.5%인 것으로 나타남. 이에 현장에서의 표준계약서 사용률 제고를 위해 표준계약서를 사용하는 이스포츠 분야의 사업자 또는 이스포츠 단체에 대하여 재정지원을 할 수 있도록 해 산업 내 전문인력들의 고용안전망을 강화하고 표준계약서의 실효성을 높이려는 것임(안 제7조의2 등).',
        procResultCd: '원안가결',
        committeeSubmitDate: '2024-06-11',
        committeePresentDate: '2024-08-26',
        committeeProcDate: '2024-09-05',
        lawSubmitDate: '2024-09-05',
        lawPresentDate: '2024-09-25',
        lawProcDate: '2024-09-25',
        rgsPresentDate: '2024-09-26',
        rgsProcDate: '2024-09-26',
    },
    {
        id: 73130,
        billTitle: '애니메이션산업 진흥에 관한 법률 일부개정법률안(강유정의원 등 10인)',
        proposer: '강유정의원 등 10인',
        voteTcnt: 207,
        yesTcnt: 207,
        noTcnt: null,
        blankTcnt: null,
        billSummary:
            '제안이유 및 주요내용 불안정한 지위로 인해 창작자들이 불합리한 대우를 받지 않게 보호하자는 취지로 만들어진 표준계약서는 법적 구속성이 없어 분야별 표준계약서가 만들어져 있음에도 불구하고 사용률이 저조한 상황임. 「2021년 콘텐츠산업 10대 불공정행위 실태조사」에 따르면 문화체육관광부에서 고시하고 있는 표준계약서를 활용하거나 사안별로 활용하고 있는 비율은 42.6%이고, 구두계약만 진행하는 경우도 18.5%인 것으로 나타남. 이에 현장에서의 표준계약서 사용률 제고를 위해 표준계약서를 사용하는 사업자 또는 사업자단체에 대하여 영화발전기금 지원 등 애니메이션산업에 관한 재정지원을 할 수 있도록 해 산업 내 창작자들의 고용안전망을 강화하고 표준계약서의 실효성을 높이려는 것임(안 제10조제2항 신설 등).',
        procResultCd: '원안가결',
        committeeSubmitDate: '2024-06-11',
        committeePresentDate: '2024-08-26',
        committeeProcDate: '2024-09-05',
        lawSubmitDate: '2024-09-05',
        lawPresentDate: '2024-09-25',
        lawProcDate: '2024-09-25',
        rgsPresentDate: '2024-09-26',
        rgsProcDate: '2024-09-26',
    },

    {
        id: 73127,
        billTitle: '북한이탈주민의 보호 및 정착지원에 관한 법률 일부개정법률안(박충권의원 등 10인)',
        proposer: '박충권의원 등 10인',
        voteTcnt: 208,
        yesTcnt: 164,
        noTcnt: 8,
        blankTcnt: 36,
        billSummary:
            '제안이유 및 주요내용 현행법은 북한이탈주민의 안정적인 정착을 위해 정치ㆍ경제ㆍ사회ㆍ문화 등 교육 여건을 고려하여 필요한 지원을 받을 수 있도록 하고 있음. 북한이탈주민 정착실태 조사에 따르면, 국내 입국 북한이탈주민 중 여성은 전체의 72%로 대부분 제3국 또는 한국에서 정착하는 과정에서 혼인하여 자녀를 출산해 가정을 이루고 있으며, 이 중 49%가 홀로 자녀를 양육하는 것으로 조사됨. 또한 한국교육개발원에 따르면 2023년 4월 기준 국내 북한이탈주민 가정의 초ㆍ중ㆍ고교 재학생 1,769명 중 중국에서 출생한 자녀들은 1,257명으로 그 비율이 71.1%에 달하고 있음. 이처럼 중국 등 제3국에서 태어난 북한이탈주민의 자녀들은 외국에서 영유아기를 보낸 탓에 한국어를 제대로 사용하지 못하는 경우가 많아 집중적인 보충학습과 충분한 교육적 배려가 필요함. 그러나 현행법은 통일부장관이 교육지원을 할 수 있는 대상으로 보호대상자인 북한이탈주민만을 규정하고 있어, 동일한 가족구성원이라도 제3국에서 출생한 자녀들은 이러한 지원의 사각지대에 놓여 있는 실정임. 이에 보호대상 여부와 관계없이 모든 북한이탈주민의 자녀를 교육지원 대상에 포함시켜 이들의 원활한 정착을 돕는 한편, 통일부장관과 교육부장관이 북한이탈주민과 그 자녀를 교육하는 학교의 운영경비 지원에 대하여 협의하도록 함으로써 다양한 교육기관에서 교육지원이 이루어질 수 있도록 하려는 것임(안 제24조제4항 신설).',
        procResultCd: '수정가결',
        committeeSubmitDate: '2024-06-27',
        committeePresentDate: '2024-08-13',
        committeeProcDate: '2024-08-29',
        lawSubmitDate: '2024-08-29',
        lawPresentDate: '2024-09-25',
        lawProcDate: '2024-09-25',
        rgsPresentDate: '2024-09-26',
        rgsProcDate: '2024-09-26',
    },
    {
        id: 73126,
        billTitle: '이동통신단말장치 유통구조 개선에 관한 법률 폐지법률안(박충권의원 등 10인)',
        proposer: '박충권의원 등 10인',
        voteTcnt: 261,
        yesTcnt: 242,
        noTcnt: 6,
        blankTcnt: 13,
        billSummary:
            '제안이유 및 주요내용 「이동통신단말장치 유통구조 개선에 관한 법률」(이하 ‘단통법’)은 이동통신사업자들이 이동통신단말을 직접 판매하는 과정에서 일부 이용자에게만 과도한 지원금을 지급하는 등의 행위로 이용자 간 차별을 유발하면서 이를 규제하기 위해 「전기통신사업법」의 특별법 형식으로 도입되었음. 하지만 4차 산업혁명의 핵심요소인 사물인터넷, 클라우드서비스, 빅데이터, 모바일화 등 이른바 ICBM의 보편화로 초연결 시대가 도래함에 따라, ICT 생태계의 건전한 발전과 이용자 후생 증진을 위해 전기통신서비스와 단말기기에 대한 통합적인 규제체계를 수립할 필요성이 증대되고, ‘단통법’으로 인해 이용자 차별이 방지되기보다 이용자에게 지급되는 지원금이 축소되는 등 이용자 후생이 저하되는 문제가 발생하고 있어, 본래 규제의 대상인 전기통신사업과 이용자 후생 증진과 직접적으로 관련되는 ‘단통법’의 조항만 남겨 「전기통신사업법」과 통합하는 것이 바람직함. 이에 이 법을 폐지하고, 전기통신사업자에 대한 일반규제법규인 「전기통신사업법」에 따라 단말기유통질서를 교란하는 문제점을 해소하고 이용자 후생을 제고하며, ‘단통법’의 운용 과정에서 드러난 제도적 문제점을 시정하려는 것임. 참고사항 이 법률안은 박충권의원이 대표발의한 「전기통신사업법 일부개정법률안」(의안번호 제96호)의 의결을 전제로 하는 것이므로, 같은 법률안이 의결되지 아니하거나 수정의결 되는 경우에는 이에 맞추어 조정되어야 할 것임.',
        procResultCd: '원안가결',
        committeeSubmitDate: '2024-06-11',
        committeePresentDate: '2024-07-16',
        committeeProcDate: '2024-11-26',
        lawSubmitDate: '2024-11-26',
        lawPresentDate: '2024-12-17',
        lawProcDate: '2024-12-17',
        rgsPresentDate: '2024-12-26',
        rgsProcDate: '2024-12-26',
    },
];
function RecentBillSection() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <p className={style.header__number}>02.</p>
                <h2 className={style.header__title}>최근 통과된 의안 한눈에 보기</h2>
                <p className={style.header__discription}>최근 통과된 의안들을 확인해보세요.</p>
            </div>
            <div className={style.contents}>
                {mockBills.map((bill) => (
                    <RecentBillCard key={bill.id} {...bill} />
                ))}
            </div>
        </div>
    );
}

export default RecentBillSection;
