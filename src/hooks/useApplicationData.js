import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer, { SET_DAY, SET_APP_DATA, SET_INTERVIEW } from "reducers/application";

export default function useApplicationData() {

  // reducer for state handling
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    dispatch({ type: SET_DAY, value: day });
  };

  // get requests and render data only once when page loads
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      dispatch({ type: SET_APP_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
    });

  }, [])

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return (
      axios
        .put(`/api/appointments/${id}`, appointment)
        .then(() => {
          dispatch({ type: SET_INTERVIEW, value: { id, interview } })
        })
    )
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return (
      axios
        .delete(`/api/appointments/${id}`, appointment)
        .then(() => {
          dispatch({ type: SET_INTERVIEW, value: { id, interview: null } })
        })
    )
  }

  return { state, setDay, bookInterview, cancelInterview }
};