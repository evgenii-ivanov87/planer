import { useState, useEffect } from 'react';
import Spinner from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

import { getLoadingUser, getErrorSignup } from 'redux/auth/auth-selectors';
import styles from './RegisterPage.module.scss';
import swal from 'sweetalert';

import GoogleLink from 'components/GoogleLink';
import { useMediaQuery } from '@material-ui/core';
import { refs } from '../../pages/SprintsPage/refs';
import { ReactComponent as TabletLeftCircles } from '../LoginPage/svg/tabletLeftCircles.svg';
import { ReactComponent as TabletRightCircles } from '../LoginPage/svg/tabletRightCircles.svg';
import { ReactComponent as DeskLeftCircles } from '../LoginPage/svg/deskLeftCircles.svg';
import { ReactComponent as DeskLeftCircle } from '../LoginPage/svg/deskLeftCircle.svg';
import { ReactComponent as DeskRightCircles } from '../LoginPage/svg/deskRightCircles.svg';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const loading = useSelector(getLoadingUser);
  const Error = useSelector(getErrorSignup);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Error === 'Request failed with status code 409') {
      swal({
        text: `This email is already in use, please use another email`,
        icon: 'error',
        button: { text: 'OK', className: `${styles.swalButton}` },
      });
    }
    setValidForm(false);
  }, [Error]);

  useEffect(() => {
    if (emailError || passwordError || confirmPasswordError || !validPassword) {
      setValidForm(false);
      return;
    }
    setValidForm(true);
  }, [emailError, passwordError, validPassword, confirmPasswordError]);

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

      case 'confirmPassword':
        setConfirmPassword(value);
        if (value !== password) {
          setValidPassword(false);
          setConfirmPasswordError('Passwords do not match');
        } else {
          setValidPassword(true);
          setConfirmPasswordError('');
        }
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const user = { email, password };
    dispatch(authOperations.signup(user));

    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const blurHandler = event => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmailDirty(true);
        break;

      case 'password':
        setPasswordDirty(true);
        break;

      case 'confirmPassword':
        setConfirmPasswordDirty(true);
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
          <h1 className={styles.title}>Registration</h1>
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
              value={password}
              required
            />
            <span className={styles.nameInput}>Password</span>
            {passwordDirty && passwordError && (
              <p className={styles.error}>{passwordError}</p>
            )}
          </label>

          <label className={styles.labelForm}>
            <input
              className={styles.inputForm}
              placeholder=" "
              type={'password'}
              name={'confirmPassword'}
              onChange={handleChange}
              onBlur={blurHandler}
              value={confirmPassword}
              required
            />
            <span className={styles.nameInput}>Repeat password</span>
            {confirmPasswordDirty && confirmPasswordError && validPassword && (
              <p className={styles.error}>Passwords do not match</p>
            )}
          </label>

          <button
            disabled={!validForm}
            className={styles.btnReg}
            type={'submit'}
          >
            Register
          </button>

          {loading && <Spinner />}

          <div className={styles.login}>
            <p className={styles.question}> Do you have an account?</p>
            <a className={styles.auth} href="/login">
              Log in
            </a>
          </div>
          <GoogleLink />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
