import React from "react";
import { TextField, Next, Button } from "@mui/material";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/dive-shop-state-machine";
import { MyContext } from "./Machine";

export default function DiveShopInfo() {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  return (
    <div className="flex flex-col space-y-4">
      <span className="italic">Please enter the following</span>
      <div className="grid grid-cols-2">
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          sx={{ ml: 2 }}
        />
        <div className="col-start-1 col-end-3 align-self-stretch">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
          />
        </div>
        <TextField
          id="outlined-basic"
          label="Dive Shop Name"
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Dive Shop Location"
          variant="outlined"
          sx={{ mt: 2, ml: 2 }}
        />
      </div>
      <div className="flex flex-row-reverse">
        <Button
          variant="outlined"
          onClick={() => {
            send({
              type: STATE_ACTIONS.NEXT,
            });
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
