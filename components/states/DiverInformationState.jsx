import React from "react";
import { useActor } from "@xstate/react";

import { Button, TextField } from "@mui/material";

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import { MyContext } from "../ReservationController";
import { statesText } from "../../utils/app-text";

const DiverInformationState = () => {
  const context = React.useContext(MyContext);

  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState();

  const [, send] = useActor(context.service);

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
          value={name}
          sx={{ width: "25ch" }}
        />
        <TextField
          id="outlined-basic"
          label={statesText.diverInformationState.lastName[context.language]}
          variant="outlined"
          onChange={(event) => setLastName(event.target.value)}
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
          value={age}
          sx={{ ml: 1, mt: 2 }}
        />
        <div className="col-end-3 mt-3 ml-2 justify-self-end">
          <Button
            variant="outlined"
            sx={{ width: "18ch" }}
            onClick={() =>
              send({
                type: STATE_ACTIONS.CREATE_SUPABASE_RESERVATION,
                value: { name, lastName, email, age },
              })
            }
          >
            Next
          </Button>
        </div>
      </div>
    </StatePage>
  );
};

export default DiverInformationState;
