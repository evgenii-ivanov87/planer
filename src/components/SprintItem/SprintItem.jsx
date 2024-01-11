import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import dayjs from 'dayjs';
import { confirmAlert } from 'react-confirm-alert';
import '../ButtonDeleteProject/react-confirm-alert.scss';

import projectsOperations from 'redux/projects/projects-operations';
import sprintsOperations from 'redux/sprints/sprints-operations';
import ButtonDelete from '../ButtonDelete';
import styles from './SprintItem.module.scss';

const SprintItem = ({ currentProject, sprint }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickDelete = async () => {
    const project = await dispatch(
      projectsOperations.getProjectById(currentProject.id),
    );

    if (!project) {
      history.push(`/projects`);
      return;
    }

    await dispatch(
      sprintsOperations.deleteSprint(currentProject.id, sprint.id),
    );
  };

  const handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.custom_ui}>
            <h1>Are you sure?</h1>
            <p>You want to delete {sprint.name} ?</p>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={styles.rdyBtn}
              type="button"
              onClick={() => {
                handleClickDelete();
                onClose();
              }}
            >
              Ok
            </button>
          </div>
        );
      },
    });
  };

  return (
    <div className={styles.LinkWrapper}>
      <Link
        to={{
          pathname: `/projects/${sprint.project}/${sprint.id}`,
        }}
      >
        <div className={styles.itemWrap}>
          <h3>{sprint.name}</h3>

          <ul>
            <li>
              <span>Start date</span>
              <span>{dayjs(sprint.startDate).format('D MMM')}</span>
            </li>
            <li>
              <span>End date</span>
              <span>{dayjs(sprint.endDate).format('D MMM')}</span>
            </li>
            <li>
              <span>Duration</span>
              <span>{sprint.duration}</span>
            </li>
          </ul>
        </div>
      </Link>
      <ButtonDelete handleClick={handleClick} />
    </div>
  );
};

export default SprintItem;

SprintItem.propTypes = {
  currentProject: PropTypes.object.isRequired,
  sprint: PropTypes.object.isRequired,
};
