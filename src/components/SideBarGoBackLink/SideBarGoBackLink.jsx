import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as Arrow } from './arrow.svg';
import s from './SideBarGoBackLink.module.scss';

const SideBarGoBackLink = ({ match }) => {
  const {
    path,
    params: { projectId },
  } = match;

  return (
    <>
      {path === '/projects/:projectId' ? (
        <Link
          className={s.showProjectsLink}
          to={{
            pathname: `/projects`,
          }}
        >
          <Arrow className={s.Arrow} />
          <span>Show projects</span>
        </Link>
      ) : (
        <Link
          className={s.showProjectsLink}
          to={{
            pathname: `/projects/${projectId}`,
          }}
        >
          <Arrow className={s.Arrow} />
          <span>Show sprints</span>
        </Link>
      )}
    </>
  );
};

export default withRouter(SideBarGoBackLink);
