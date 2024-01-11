import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getParticipants } from 'redux/projects/projects-selectors';
import { getUserEmail } from 'redux/auth/auth-selectors';
import projectsOperations from 'redux/projects/projects-operations';
import PeopleList from 'components/PeopleList';
import swal from 'sweetalert';

import s from './AddPeopleForm.module.scss';

const AddPeopleForm = ({ onClickCancel, projectId }) => {
  const [email, setEmail] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const participants = useSelector(getParticipants);
  const userEmail = useSelector(getUserEmail);

  const dispatch = useDispatch();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!email) {
      setEmptyInput(true);
      return;
    }

    const normalizedName = email.toLowerCase().trim();
    const isExistingUser = participants.find(
      el => el.toLowerCase() === normalizedName,
    );
    if (isExistingUser) {
      swal('Warning!', `${email} is already in Participants!`, 'warning');
      return;
    }

    if (userEmail === normalizedName) {
      swal(
        'Warning!',
        `It's impossible to add yourself to Participants!`,
        'warning',
      );
      return;
    }

    const participant = {
      email,
    };

    dispatch(projectsOperations.addParticipant(projectId, participant));

    setEmail('');
    setEmptyInput(false);
  };

  return (
    <div className={s.form}>
      <h2 className={s.title}>Add people</h2>
      <form id="add" onSubmit={handleSubmit}>
        <label htmlFor={email}>
          <input
            // required
            id={email}
            value={email}
            type="email"
            name="email"
            autoComplete="current-email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Enter e-mail"
            className={emptyInput ? s.empty_input : s.input}
            onChange={handleChange}
          />
        </label>
      </form>

      {participants.length === 0 ? (
        <div>
          <p className={s.text}>Added users:</p>
          <p>You have not added any users yet</p>
        </div>
      ) : (
        <div>
          <p className={s.text}>
            There are {participants.length} participants in project now:
          </p>

          <PeopleList
            onClickCancel={onClickCancel}
            projectId={projectId}
            participants={participants}
          />
        </div>
      )}

      <button form="add" type="submit" className={s.ready_btn}>
        Ready
      </button>

      <button
        form="add"
        type="button"
        onClick={onClickCancel}
        className={s.cancel_btn}
      >
        Cancel
      </button>
    </div>
  );
};

AddPeopleForm.propTypes = {
  projectId: PropTypes.string.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default AddPeopleForm;
