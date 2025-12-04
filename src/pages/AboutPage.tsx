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
        },
        {
            school: '국민대학교 AI디자인학과',
            name: '윤예지',
            role: 'Logo Design',
            link: 'https://www.instagram.com/luxis_studio/?igsh=MTdpM2duZTUwOXNjbQ%3D%3D#',
        },
    ];

    return (
        <main className={style.container}>
            <section className={style.header}>
                <img src={logo} alt="ViewPoint 로고" className={style.logo} />
            </section>

            <section className={style.section}>
                <h2 className={style.sectionTitle}>프로젝트 개요</h2>
                <p className={style.paragraph}>
                    ViewPoint는 아주대학교 25-2 파란학기에서 만들어진 프로젝트로, 국회의원 이념
                    분석과 의안·의원 정보를 쉽고 투명하게 보여주는 서비스입니다.
                    <br />
                    데이터 분석과 시각화를 기반으로 정치 정보 속 숨은 편향을 줄이고,
                    <br /> 시민들이 스스로 합리적으로 판단할 수 있도록 돕는 공익적 플랫폼을
                    지향합니다.
                    <br />
                    문의: dnldmlwhd@ajou.ac.kr
                </p>
            </section>

            <section className={style.section}>
                <h2 className={style.sectionTitle}>팀 소개</h2>
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
                                    Link
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
