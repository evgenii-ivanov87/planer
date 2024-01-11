import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import SprintItem from '../SprintItem';
import { getSprints } from 'redux/sprints/sprints-selectors';
import styles from './SprintList.module.scss';

const SprintList = ({ currentProject }) => {
  const sprints = useSelector(getSprints);

  return sprints.length === 0 ? (
    <p className={styles.listWrapper}>Create first sprint</p>
  ) : (
    <ul className={styles.listWrapper}>
      {sprints.map(sprint => (
        <li key={sprint.id} className={styles.listItem}>
          <SprintItem currentProject={currentProject} sprint={sprint} />
        </li>
      ))}
    </ul>
  );
};

SprintList.propTypes = {
  currentProject: PropTypes.object,
};

export default SprintList;
