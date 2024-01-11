import { useState } from 'react';
import Modal from 'components/ModalFooter';
import styles from './Footer.module.scss';
import team from './team.json';
import TeamCard from 'components/TeamCard';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    !showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
    setShowModal(!showModal);
  };

  return (
    <footer className={styles.Footer}>
      <span className={styles.Footer_text}>
        &#169; 2021 | All Rights Reserved | Developed by
      </span>
      <p className={styles.Footer_link} onClick={toggleModal}>
        GoIT Students
      </p>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          {
            <div>
              <h2 className={styles.Team_title}> Our team</h2>
              <ul className={styles.Team_list}>
                {team.map(mate => (
                  <li key={mate.id} className={styles.Team_item}>
                    <TeamCard team={mate}></TeamCard>
                  </li>
                ))}
              </ul>
            </div>
          }
        </Modal>
      )}
    </footer>
  );
};

export default Footer;
