import React from "react";
import { useActor } from "@xstate/react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import isNumeric from "validator/lib/isNumeric";

import { STATE_ACTIONS } from "../../utils/state-machine";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import { MyContext } from "../ReservationController";
import FormTextField from "../shared/FormTextField";

const DiverInformationState = () => {
  const machine = React.useContext(MyContext);

  const [, send] = useActor(machine);

  const { handleSubmit, control } = useForm();
  const handleSubmitForm = ({ name, lastName, email, age }) => {
    send({
      type: STATE_ACTIONS.CREATE_SUPABASE_RESERVATION,
      value: { name, lastName, email, age },
    });
  };
  return (
    <StatePage>
      <StateTitle title="Diver Information" />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mt-8 flex flex-col md:flex-none space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-2 ">
          <FormTextField name="name" label="Name" control={control} />
          <FormTextField name="lastName" label="Last Name" control={control} />
          <FormTextField
            name="email"
            label="Email"
            control={control}
            pattern="[0-9]*"
            inputMode="numeric"
            rules={{
              validate: (value) => isEmail(value) || "Not a valid email",
            }}
          />
          <FormTextField
            name="age"
            label="Age"
            inputMode="numeric"
            pattern="[0-9]*"
            control={control}
            rules={{
              validate: (value) => isNumeric(value) || "Please enter a number",
            }}
          />
          <div className="flex flex-row-reverse md:col-end-3 mt-8">
            <Button variant="outlined" sx={{ width: "18ch" }} type="submit">
              Next
            </Button>
          </div>
        </div>
      </form>
    </StatePage>
  );
};

export default DiverInformationState;
