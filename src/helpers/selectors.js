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