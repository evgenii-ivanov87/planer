import 'date-fns';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

import projectsOperations from 'redux/projects/projects-operations';
import sprintsOperations from 'redux/sprints/sprints-operations';

import s from './CreateSprint.module.scss';

// Form
const useStyles = makeStyles({
  root: {
    '& .MuiGrid-container': {
      marginRight: 30,
    },

    '& .MuiFormControl-root': {
      margin: 0,
      width: '100%',
    },

    // Lable
    '& label': {
      fontFamily: ['Montserrat', 'sans-serif'],
      fontWeight: 400,
      letterSpacing: '0.04em',
      color: 'rgba(24, 28, 39, 0.6)',

      '&.MuiFormLabel-root': {
        paddingLeft: 7,
        color: 'rgba(24, 28, 39, 0.6)',
        fontSize: 16,

        [`@media (min-width: ${768}px)`]: {
          fontSize: 18,
        },

        '&.MuiFormLabel-root.MuiInputLabel-shrink': {
          fontSize: '1.2rem',
          paddingLeft: 0,
        },
      },
    },

    '& input': {
      paddingLeft: 7,
      fontFamily: ['Montserrat', 'sans-serif'],
      fontSize: 18,
      color: '#181C27',
    },

    // Input border
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff6b08',
    },

    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(24, 28, 39, 0.2)',
    },

    '& .MuiInput-underline:hover:before': {
      borderBottom: '1px solid rgba(24, 28, 39, 0.2)',
    },
  },
});

// Calendar
const materialTheme = createTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',

        backdropFilter: 'blur(24px)',
        '&.MuiPaper-elevation8': {
          borderRadius: 20,
        },
      },
    },

    MuiPopover: {
      paper: {
        minWidth: 280,
      },
    },

    MuiPickersBasePicker: {
      container: {
        borderRadius: 20,
      },

      pickerView: {
        maxWidth: '100%',
        minWidth: 'auto',
        minHeight: 'auto',
      },
    },

    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#8bc34a',
      },
    },

    // Header
    MuiPickersCalendarHeader: {
      switchHeader: {
        marginTop: 0,
        marginBottom: 0,
        height: 40,
        backgroundColor: 'white',
        borderRadius: '20px 20px 0px 0px',

        '& p': {
          fontFamily: ['Montserrat', 'sans-serif'],
          fontSize: 18,
          fontWeight: 500,
          color: '#1B1C20',
        },
      },

      // Arrows
      iconButton: {
        backgroundColor: 'transparent',

        '&:hover': {
          backgroundColor: 'transparent',
        },
      },

      // Days Header
      daysHeader: {
        padding: '23px 7px',
      },

      // Days
      dayLabel: {
        fontFamily: ['Montserrat', 'sans-serif'],
        fontWeight: 600,
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#FF6B08',
      },
    },

    MuiPickersCalendar: {
      transitionContainer: {
        marginTop: 0,
      },

      week: {
        marginBottom: 6,
      },
    },

    // Day selected
    MuiPickersDay: {
      day: {
        width: 32,
        height: 32,
        marginLeft: 3,
        marginRight: 3,
      },

      daySelected: {
        backgroundColor: '#FF6B08',

        '&:hover': {
          backgroundColor: '#FF6B08',
        },

        '& p': {
          color: 'white',
        },
      },
    },

    // Day number
    MuiIconButton: {
      label: {
        '& p': {
          fontFamily: ['Montserrat', 'sans-serif'],
          fontWeight: 400,
          fontSize: 14,
          color: '#181C27',
        },
      },
    },
  },
});

const CreateSprint = ({ onClickCancel, projectId }) => {
  const [sprintName, setSprintName] = useState('');
  const [previousDays, setPreviousDays] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(false);
  const errorMessage = 'This field is require';
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // Input - Date
  const handleDateChange = date => {
    setError(false);
    setSelectedDate(date);
  };

  // Input - sprintName and duration
  const handleInputForm = e => {
    setError(false);

    const { name, value } = e.target;
    name === 'sprintName' ? setSprintName(value) : setDuration(value);
  };

  // Checkbox
  const handlePeviousDaysChange = e => {
    setPreviousDays(e.currentTarget.checked);
  };

  // New sprint
  const createNewSprint = e => {
    e.preventDefault();

    sprintName !== '' && selectedDate !== null && duration !== ''
      ? sendNewSprint()
      : setError(true);

    return;
  };

  // Send new sprint
  const sendNewSprint = async () => {
    setError(false);

    const currentProject = await dispatch(
      projectsOperations.getProjectById(projectId),
    );

    if (!currentProject) {
      history.push(`/projects`);
      return;
    }
    const newSprint = {
      name: sprintName,
      startDate: selectedDate,
      duration,
    };

    dispatch(sprintsOperations.createSprint(projectId, newSprint));
    onClickCancel();

    setSprintName('');
    setSelectedDate(new Date());
    setDuration('');
  };

  return (
    <div className={s.CreateSprintWrap}>
      <h3>Creating a sprint</h3>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={createNewSprint}
      >
        <div className={s.nameTextFieldWrap}>
          {sprintName === '' && error && (
            <span className={s.error}>{errorMessage}</span>
          )}
          <TextField
            required
            id="standard-basic"
            label="The name of the sprint"
            type="text"
            name="sprintName"
            value={sprintName}
            onChange={handleInputForm}
          />
        </div>

        <label className={s.checkboxLabel}>
          <input
            className={s.visuallyHidden}
            type="checkbox"
            name="previousDays"
            checked={previousDays}
            onChange={handlePeviousDaysChange}
          />
          <span className={s.checkboxIcon}>
            <span className={s.orangeCircle} />
          </span>
          <span className={s.checkboxLabel}>Previous Days</span>
        </label>

        <div className={s.dataWrap}>
          <div className={s.KeyboardDatePickerWrap}>
            {selectedDate === null && error && (
              <span className={s.error}>{errorMessage}</span>
            )}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <Grid container justifyContent="space-around">
                  {previousDays ? (
                    <KeyboardDatePicker
                      required
                      disableToolbar
                      variant="inline"
                      format="dd MMM"
                      margin="normal"
                      id="date-picker-inline"
                      label="End date"
                      type="text"
                      name="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  ) : (
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      minDate={new Date()}
                      format="dd MMM"
                      margin="normal"
                      id="date-picker-inline"
                      label="End date"
                      type="text"
                      name="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  )}
                </Grid>
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>

          <div className={s.durationTextFieldWrap}>
            {duration === '' && error && (
              <span className={s.error}>{errorMessage}</span>
            )}
            <TextField
              required
              id="standard-basic"
              label="Duration"
              type="text"
              name="duration"
              value={duration}
              onChange={handleInputForm}
            />
          </div>
        </div>
        <button className={s.formBtn} type="submit">
          Ready
        </button>

        <div className={s.cancelBtnWrap}>
          <span onClick={onClickCancel} className={s.cancelBtn}>
            Cancel
          </span>
        </div>
      </form>
    </div>
  );
};

CreateSprint.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default CreateSprint;
