export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter(item => item.name === day);
  if (filteredDays.length === 0) {
    return [];
  };

  const filteredAppArr = [];

  for (const el of filteredDays[0].appointments) {
    for (const appointment in state.appointments) {
      if (el === state.appointments[appointment].id) {
        filteredAppArr.push(state.appointments[appointment]);
      }
    }
  }
  return filteredAppArr;
}


export function getInterview(state, interview) {
  const interViewData = {};

  state.interviewers = {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }

    if(!interview) {
    return null;
  }

  interViewData.student = interview.student;
  for (const interviewer in state.interviewers) {
    if (interview.interviewer === state.interviewers[interviewer].id) {
      interViewData.interviewer = state.interviewers[interviewer];
    }
  }
  return interViewData;
};