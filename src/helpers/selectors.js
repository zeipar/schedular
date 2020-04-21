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
    filteredAppArr.push(state.appointments[el]);
  }
  return filteredAppArr;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter(item => item.name === day);
  if (filteredDays.length === 0) {
    return [];
  };

  const filteredInterviewersArr = [];
  for (const el of filteredDays[0].interviewers) {
    filteredInterviewersArr.push(state.interviewers[el]);
  }

  return filteredInterviewersArr;
}


export function getInterview(state, interview) {
  const interViewData = {};

  if (!interview) {
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