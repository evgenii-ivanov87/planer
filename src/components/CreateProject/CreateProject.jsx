import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import projectsOperations from 'redux/projects/projects-operations';

import styles from './CreateProject.module.scss';

const CreateProject = ({ onClickCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);

  const dispatch = useDispatch();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!name) {
      setEmptyInput(true);
      return;
    }
    const newProject = {
      name,
      description,
    };

    await dispatch(projectsOperations.createProject(newProject));
    await dispatch(projectsOperations.getAllProjects());
    onClickCancel();

    setName('');
    setDescription('');
    setEmptyInput(false);
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Creating a project</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <input
          value={name}
          name="name"
          type="text"
          placeholder={emptyInput ? 'Please enter project name' : ' '}
          className={emptyInput ? styles.empty_input : styles.input_name}
          onChange={handleNameChange}
        />
        <div className={styles.labelBox}>
          <label className={styles.nameLabel}>
            {emptyInput ? ' ' : 'Project name'}
          </label>
        </div>

        <input
          id="add"
          value={description}
          name="description"
          type="text"
          placeholder={emptyInput ? 'Please enter description' : ' '}
          className={emptyInput ? styles.empty_input : styles.input}
          onChange={handleDescriptionChange}
        />
        <div className={styles.labelBoxDescription}>
          <label className={styles.descriptionLabel}>
            {emptyInput ? ' ' : 'Please enter description'}
          </label>
        </div>

        <button type="submit" className={styles.ready_btn}>
          Ready
        </button>

        <button
          type="button"
          className={styles.cancel_btn}
          onClick={onClickCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

CreateProject.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
};

export default CreateProject;
