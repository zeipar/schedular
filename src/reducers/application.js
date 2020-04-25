export const SET_DAY = "SET_DAY";
export const SET_APP_DATA = "SET_APP_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  // assign reduced logic depending on the action type
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }

    case SET_APP_DATA:
      return { ...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers }

    case SET_INTERVIEW:
      {
        const appointment = { ...state.appointments[action.value.id], interview: action.value.interview };
        const appointments = { ...state.appointments, [action.value.id]: appointment };

        // get current remaining spots
        let curDay = state.days.filter(day => day.appointments.includes(action.value.id))[0];

        // adjust remaining spot save (+1) and delete (-1)
        const stateInterviewStatus = state.appointments[action.value.id].interview;
        const afterInterview = action.value.interview;

        let curSpots = curDay.spots;

        if (!afterInterview || !stateInterviewStatus) {
          curSpots = (afterInterview) ? curDay.spots - 1 : curDay.spots + 1;
        }

        // update remaining spot and return 
        const newDay = { ...curDay, spots: curSpots };
        const newDays = state.days.map(day => (day.id === newDay.id ? newDay : day));
        return { ...state, appointments, days: newDays }
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};