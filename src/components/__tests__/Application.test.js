import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, prettyDOM, getAllByTestId, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));


    // 4. Check that the confirmation message is shown.

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.

    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

    const dayListItem = getAllByTestId(container, "day").find(item => getByText(item, "Monday"));

    expect(getByText(dayListItem, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check if "Archie Cohen" is set as the default student name

    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    // 5. check if "Tori Malcolm" is set as the default interviewer
    
    const interviewers = getAllByTestId(appointment, "interviewer").find(interview => queryByText(interview, "Tori Malcolm"));
    expect(getByText(interviewers, "Tori Malcolm"));
    
    // 6. enter "Jason Park" as student name
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jason Park" }
    });
    
    // 7. set "Sylvia Palmer" as interviewer
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 8. Click Save button
    fireEvent.click(getByText(appointment, "Save"));
    
    // 9. check if "Saving" exists in the document
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    
    // 10. wait until "Jason Park" can be found
    await waitForElement(() => getByText(appointment, "Jason Park"));
    
    // 11. check if "Silvia Palmer" is set as interviewer
    
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    // 12. check if the spot number did not change : "no spots remaioning"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });
})
