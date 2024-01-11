import { useState, useEffect } from 'react';
import Spinner from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import swal from 'sweetalert';
// Circles -----------------------
import { useMediaQuery } from '@material-ui/core';
import { refs } from '../../pages/SprintsPage/refs';
import { ReactComponent as TabletLeftCircles } from './svg/tabletLeftCircles.svg';
import { ReactComponent as TabletRightCircles } from './svg/tabletRightCircles.svg';
import { ReactComponent as DeskLeftCircles } from './svg/deskLeftCircles.svg';
import { ReactComponent as DeskLeftCircle } from './svg/deskLeftCircle.svg';
import { ReactComponent as DeskRightCircles } from './svg/deskRightCircles.svg';
// -------------------------------
import GoogleLink from 'components/GoogleLink';
import { getLoadingUser, getErrorLogin } from 'redux/auth/auth-selectors';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('Wrong password');
  const [validForm, setValidForm] = useState(false);

  const loading = useSelector(getLoadingUser);
  const Error = useSelector(getErrorLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Error === 'Request failed with status code 500') {
      swal({
        text: `This email is not registered, please register`,
        icon: 'error',
        button: { text: 'OK', className: `${styles.swalButton}` },
      });
    }

    if (Error === 'Request failed with status code 401') {
      swal({
        text: `Email or password is wrong`,
        icon: 'error',
        button: { text: 'OK', className: `${styles.swalButton}` },
      });
    }

    setValidForm(false);
  }, [Error]);

  useEffect(() => {
    if (emailError || passwordError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [emailError, passwordError]);

  // ------- useMediaQuery -------
  const handleMixWidth = (minWidth, maxWidth) => {
    return `(min-width:${minWidth}px) and (max-width:${maxWidth}px) `;
  };
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const desktopMix = useMediaQuery(
    handleMixWidth(refs.tablet, refs.desktopMax),
  );
  const desktop = useMediaQuery(handleMinWidth(refs.desktop));
  // ----- End useMediaQuery -----

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
          setEmailError('');
        } else {
          setEmailError('');
        }
        break;

      case 'password':
        setPassword(value);
        if (
          event.currentTarget.value.length < 3 ||
          event.currentTarget.value.length > 8
        ) {
          setPasswordError('Wrong password');
        } else {
          setPasswordError('');
        }
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const user = { email, password };
    dispatch(authOperations.login(user));

    reset();
  };

  const reset = () => {
    setPassword('');
  };

  const blurHandler = event => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmailDirty(true);
        break;

      case 'password':
        setPasswordDirty(true);
        break;

      default:
        return;
    }
  };

  return (
    <div className={styles.backgroundMain}>
      <div className={styles.circlesWrap}>
        {desktopMix && (
          <div className={styles.tabletCircles}>
            <div className={styles.tabletLeftSide}>
              <TabletLeftCircles />
            </div>
            <div className={styles.tabletRightSide}>
              <TabletRightCircles className={styles.tabletRightCircles} />
            </div>
          </div>
        )}

        {desktop && (
          <div className={styles.deskCircles}>
            <div className={styles.deskLeftSide}>
              <DeskLeftCircles />
            </div>
            <div className={styles.deskRightSide}>
              <DeskRightCircles className={styles.rightCircles} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.formWrap}>
        <div className={styles.circleWrap}>
          {desktop && (
            <div className={styles.deskCircles}>
              <div className={styles.deskLeftSide}>
                <DeskLeftCircle className={styles.DeskLeftCircle} />
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleFormSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <h1 className={styles.title}>Enter</h1>
          <label className={styles.labelForm}>
            <input
              className={styles.inputForm}
              placeholder=" "
              type={'email'}
              name={'email'}
              onChange={handleChange}
              onBlur={blurHandler}
              value={email}
              required
            />
            <span className={styles.nameInput}>E-mail</span>
            {emailDirty && emailError && (
              <p className={styles.error}>{emailError}</p>
            )}
          </label>
          <label className={styles.labelForm}>
            <input
              className={styles.inputForm}
              placeholder=" "
              type={'password'}
              name={'password'}
              onChange={handleChange}
              onBlur={blurHandler}
              values={password}
              required
            />
            <span className={styles.nameInput}>Password</span>
            {passwordDirty && passwordError && (
              <p className={styles.error}>{passwordError}</p>
            )}
          </label>
          <button
            className={styles.btnLog}
            type={'submit'}
            disabled={!validForm}
          >
            Enter
          </button>

          {loading && <Spinner />}

          <div className={styles.login}>
            <p className={styles.question}> No account? </p>
            <a className={styles.auth} href="/users/signup">
              Register
            </a>
          </div>
          <GoogleLink />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
