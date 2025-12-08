import style from './SectionContainer.module.scss';
import likeImg from '../../assets/Like.png';
import { useState } from 'react';

function DonationContainer() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div
            className={`${style.container} ${openModal ? style.containerModalOpen : ''}`}
            onClick={() => setOpenModal(true)}>
            <p className={style.number}>06.</p>
            <div className={style.header}>
                <div className={style.wrapper}>
                    <h2 className={style.header__title}>후원하기</h2>
                    <p className={style.header__discription}>
                        ViewPoint는 국회 공개 데이터를 기반으로, 시민들에게 투명한 정치 정보를
                        제공합니다.
                    </p>
                </div>
                <img className={style.img} src={likeImg} alt="클립보드이미지" />
            </div>

            {openModal && (
                <div className={style.modalOverlay} onClick={() => setOpenModal(false)}>
                    <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 className={style.modal__title}>ViewPoint 후원 안내</h3>
                        <p className={style.modal__desc}>
                            ViewPoint는 공공 데이터에 기반한 중립적 정보 제공을 목표로 합니다.
                            <br />
                            어떤 정당이나 이해관계에도 치우치지 않고, 시민의 알 권리를 위해 투명한
                            정치 정보를 전달합니다. 여러분의 후원은 서비스의 지속가능성과 데이터
                            품질 개선에 소중히 사용됩니다.
                        </p>
                        <div className={style.modal__account}>
                            <span className={style.modal__accountLabel}>후원 계좌</span>
                            <strong className={style.modal__accountNumber}>
                                토스뱅크 1002-3236-0568 (예금주: 위의종(모임통장))
                            </strong>
                        </div>
                        <div className={style.modal__actions}>
                            <button
                                className={style.modal__closeBtn}
                                onClick={() => setOpenModal(false)}>
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DonationContainer;
