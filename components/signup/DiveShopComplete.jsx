import React, { useEffect, useState } from "react";
import { TextField, Next, Button } from "@mui/material";
import { useActor } from "@xstate/react";
import { customAlphabet } from "nanoid";

import { STATE_ACTIONS } from "../../utils/dive-shop-state-machine";
import { MyContext } from "./Machine";
import supabase from "../../utils/supabase";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz");

// TODO(adolfo): read from context instead
const getValues = () => {
  return {
    name: "Dive Shop test",
    url_hash: nanoid(8),
    email: "adolfo@test.com",
    admin_name: "Adolfo",
    admin_last_name: "Portilla",
    location: { city: "Austin", state: "TX", country: "US" },
  };
};

export default function DiveShopInfo() {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const { data, error: apiError } = await supabase
          .from("dive-shop")
          .insert([getValues()]);
        if (apiError) {
          setError(apiError);
        }
        setData(data[0]);
        console.log("data", data);
      } catch (error) {
        setError(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <span>Generating your dive shop configuration, hold tight!</span>
        </div>
      ) : error ? (
        <div>
          <span>
            There was an error creating your client, please try again later
          </span>
        </div>
      ) : (
        <div>
          Your account was successfully created, please visit{" "}
          <a href={"www.diverlist.com/" + data.url_hash}>
            {"www.diverlist.com/" + data.url_hash}
          </a>
          to test out the reservation system.
        </div>
      )}
    </div>
  );
}
