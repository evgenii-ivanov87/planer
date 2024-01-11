import GoogleIcon from './Google_icon.png';
import styles from './GoogleLink.module.scss';

const GoogleLink = () => {
  return (
    <a
      className={styles.googleAuth}
    href="http://localhost:5000/api/users/google"
    // href="https://project-planning-rest-api.herokuapp.com/api/users/google"
      
    >
      <img src={GoogleIcon} alt="Google Icon" width="30" height="30" />
      Log in with GOOGLE
    </a>
  );
};

export default GoogleLink;
