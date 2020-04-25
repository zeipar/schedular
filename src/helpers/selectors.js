export function getAppointmentsForDay(state, selectedDay) {

  // if received no days object, return an empty array
  if (state.days.length === 0) {
    return [];
  }

  // return an empty array if there is no match, otherwise return an array of matching objects
  const matchingAppts = state.days.filter(day => day.name === selectedDay);

  return (matchingAppts.length === 0 ? [] : matchingAppts[0].appointments.map(id =>
    state.appointments[id]));

};

export function getInterviewersForDay(state, selectedDay) {

  // if received no days object, return an empty array
  if (state.days.length === 0) {
    return [];
  }

  // return an empty array if there is no match, otherwise return an array of matching objects
  const matchingInterviews = state.days.filter(day => day.name === selectedDay);

  return (matchingInterviews.length === 0 ? [] : matchingInterviews[0].interviewers.map(id =>
    state.interviewers[id]));

};

export function getInterview(state, interview) {
  const interViewData = {};

  if (!interview) {
    return null;
  }

  // assign student k:v to interViewData
  interViewData.student = interview.student;

  for (const interviewer in state.interviewers) {
    if (interview.interviewer === state.interviewers[interviewer].id) {
      interViewData.interviewer = state.interviewers[interviewer];
    }
  }
  return interViewData;
};