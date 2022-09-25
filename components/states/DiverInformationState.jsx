import React from "react";
import { useActor } from "@xstate/react";

import { Button, TextField } from "@mui/material";
import isEmail from "validator/lib/isEmail";

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import { MyContext } from "../ReservationController";
import { statesText } from "../../utils/app-text";
import StateCards from "./shared/StateCards";

const DiverInformationState = () => {
  const context = React.useContext(MyContext);

  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState();

  const [nameValid, setNameValid] = React.useState(true);
  const [lastNameValid, setLastNameValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [ageValid, setAgeValid] = React.useState(true);

  const [, send] = useActor(context.service);

  const validateEmail = () => {
    if (!isEmail(email)) {
      setEmailValid(false);
      return false;
    }
    setEmailValid(true);
    return true;
  };

  const validateAge = () => {
    const num = Number(age);
    if (!(Number.isInteger(num) && num > 0)) {
      setAgeValid(false);
      return false;
    }
    setAgeValid(true);
    return true;
  };

  const validateName = () => {
    if (!name) {
      setNameValid(false);
      return false;
    }
    setNameValid(true);
    return true;
  };

  const validateLastName = () => {
    if (!lastName) {
      setLastNameValid(false);
      return false;
    }
    setLastNameValid(true);
    return true;
  };

  const formValidated = () => {
    let valid = true;
    if (!validateName()) {
      valid = false;
    }
    if (!validateLastName()) {
      valid = false;
    }
    if (!validateAge()) {
      valid = false;
    }
    if (!validateEmail()) {
      valid = false;
    }

    return valid;
  };

  return (
    <StatePage>
      <StateTitle
        title={statesText.diverInformationState.title[context.language]}
      />
      <div className="grid grid-cols-2 ">
        <TextField
          id="outlined-basic"
          label={statesText.diverInformationState.name[context.language]}
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
          error={nameValid ? false : true}
          helperText={nameValid ? "" : "Enter Name"}
          value={name}
          sx={{ width: "25ch" }}
        />
        <TextField
          id="outlined-basic"
          label={statesText.diverInformationState.lastName[context.language]}
          variant="outlined"
          onChange={(event) => setLastName(event.target.value)}
          error={lastNameValid ? false : true}
          helperText={lastNameValid ? "" : "Enter Last Name"}
          value={lastName}
          sx={{ ml: 1 }}
        />
        <TextField
          id="outlined-basic"
          label={statesText.diverInformationState.email[context.language]}
          variant="outlined"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(event) => setEmail(event.target.value)}
          error={emailValid ? false : true}
          helperText={emailValid ? "" : "Invalid Email"}
          value={email}
          sx={{ mt: 2 }}
        />
        <TextField
          id="outlined-basic"
          label={statesText.diverInformationState.age[context.language]}
          variant="outlined"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(event) => setAge(event.target.value)}
          error={ageValid ? false : true}
          helperText={ageValid ? "" : "Invalid Age"}
          value={age}
          sx={{ ml: 1, mt: 2 }}
        />
        <div className="col-end-3 mt-3 ml-2 justify-self-end">
          <Button
            variant="outlined"
            sx={{ width: "18ch" }}
            onClick={() => {
              if (formValidated()) {
                send({
                  type: STATE_ACTIONS.CREATE_SUPABASE_RESERVATION,
                  value: { name, lastName, email, age },
                });
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </StatePage>
  );
};

export default DiverInformationState;
