import React, { useState, useEffect } from "react";

import "components/Application.scss";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => {
    setState({ ...state, day});
  };

  useEffect(() =>{

    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments'))
    ]).then((all) => {
      console.log(all);
      setState(prev => ({days: all[0].data, appointments: all[1].data}));
    });

  }, [])

  const times = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {times}
      </section>
    </main>
  );
}
