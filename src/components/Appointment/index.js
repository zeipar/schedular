import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    props.bookInterview(props.id, interview)
      .then(() => {
        transition("SHOW")
      })
      .catch(err => console.error(err));

  };

  const confirm = () => {
    transition("CONFIRM");
  }

  const remove = () => {
    transition("DELETING");
    props.cancelInterview(props.id)
      .then(() => {
        transition("EMPTY")
      })
      .catch(err => console.error(err));
  };


  return (
    <Fragment>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          save={save}
        />
      )}
      {mode === SAVING && (
        <Status message="SAVING" />
      )}
      {mode === DELETING && (
        <Status message="DELETING" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={remove}
        />
      )}
    </Fragment>
  )
}