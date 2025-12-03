import logo from '../assets/ViewPoint.png';
import style from './styles/AboutPage.module.scss';

function AboutPage() {
    const team = [
        {
            school: '아주대학교 정치외교학과',
            name: '위의종',
            role: 'Project Manager | FE',
            link: 'https://github.com/Carcassi0',
        },
        {
            school: '아주대학교 소프트웨어학과',
            name: '정용훈',
            role: 'BE | AI',
            link: 'https://github.com/hun9008',
        },
        {
            school: '아주대학교 소프트웨어학과',
            name: '육세현',
            role: 'BE | AI',
            link: 'https://github.com/sehyunsix',
        },
        {
            school: '아주대학교 정치외교학과',
            name: '이준혁',
            role: 'Model',
        },
        {
            school: '아주대학교 정치외교학과',
            name: '윤예원',
            role: 'Model',
        },
        {
            school: '아주대학교 디지털미디어학과',
            name: '유경진',
            role: 'UX/UI',
            link: 'https://behance.net/designer2',
        },
        {
            school: '국민대학교 AI디자인학과',
            name: '윤예지',
            role: 'Logo Design',
            link: 'https://behance.net/designer2',
        },
    ];

    return (
        <main className={style.container}>
            <section className={style.header}>
                <img src={logo} alt="ViewPoint 로고" className={style.logo} />
                <h2 className={style.pageTitle}>ViewPoint 프로젝트를 소개합니다</h2>
            </section>

            <section aria-labelledby="about-title" className={style.section}>
                <h2 id="about-title" className={style.sectionTitle}>
                    프로젝트 개요
                </h2>
                <p className={style.paragraph}>
                    ViewPoint는 아주대학교 25-2 파란학기에서 진행된 프로젝트로, 국회의원의 이념
                    분석과 의안·의원 정보 제공을 통해 시민의 합리적 판단을 돕는 중립적이고 공익을
                    추구하는 서비스입니다. 데이터 기반 시각화로 가능한 편향을 줄이고 시민에게 투명한
                    정보 접근을 지원합니다.
                </p>
            </section>

            <section aria-labelledby="team-title" className={style.section}>
                <h2 id="team-title" className={style.sectionTitle}>
                    팀 소개
                </h2>
                <ul className={style.list}>
                    {team.map((member) => (
                        <li key={member.name} className={style.listItem}>
                            <span>
                                {member.school} · {member.name} · {member.role}
                            </span>
                            {member.link ? (
                                <a
                                    href={member.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={style.link}
                                    title={`${member.name}의 링크`}>
                                    {member.role === 'Developer' ? 'GitHub' : 'Portfolio'}
                                </a>
                            ) : (
                                ''
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default AboutPage;
