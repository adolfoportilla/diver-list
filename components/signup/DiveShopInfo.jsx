import React from "react";
import { Button } from "@mui/material";
import { useActor } from "@xstate/react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { STATE_ACTIONS } from "../../utils/dive-shop-state-machine";
import { MyContext } from "./Machine";
import SignUpPage from "./SignupPage";
import FormTextField from "../shared/FormTextField";

const MARGIN_LEFT = "ml-3";
const MARGIN_TOP = "mt-3";

export default function DiveShopInfo() {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  const { handleSubmit, control } = useForm();

  const handleSubmitForm = (data) => {
    send({
      type: STATE_ACTIONS.NEXT,
      data,
    });
  };

  return (
    <SignUpPage title="Tell us more about your Dive Shop">
      <div className="flex flex-col space-y-4">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="grid grid-cols-2">
            <FormTextField name="name" label="Name" control={control} />
            <FormTextField
              name="lastName"
              label="Last Name"
              control={control}
              addedClassName={MARGIN_LEFT + " w-64"}
            />
            <FormTextField
              name="email"
              label="Email"
              control={control}
              style={{}}
              addedClassName={
                "col-start-1 col-end-3 align-self-stretch w-full " + MARGIN_TOP
              }
              helperText="This email is where diving reservations will be sent to"
              rules={{
                validate: (value) => isEmail(value) || "Not a valid email",
              }}
            />
            <FormTextField
              name="shopName"
              label="Dive Shop Name"
              control={control}
              addedClassName="mt-2"
              helperText="This will be displayed to users"
            />
            <FormTextField
              name="location"
              label="Location (cozumel, MX)"
              control={control}
              addedClassName="ml-2 mt-2"
              helperText="This will be displayed to users"
            />
          </div>
          <div className="flex flex-row-reverse mt-3">
            <Button variant="outlined" type="submit">
              Next
            </Button>
          </div>
        </form>
      </div>
    </SignUpPage>
  );
}
