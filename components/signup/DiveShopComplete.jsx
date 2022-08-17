import React, { useEffect, useState } from "react";
import { Link, CircularProgress, Alert } from "@mui/material";
import { useActor } from "@xstate/react";
import { customAlphabet } from "nanoid";

import { MyContext } from "./Machine";
import supabase from "../../utils/supabase";

const BASE_URL = "www.diverlist.com/";
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz");

const getValues = (context) => {
  return {
    name: context.diveShopInfo.name,
    url_hash: nanoid(8),
    email: context.diveShopInfo.email,
    admin_name: context.diveShopInfo.name,
    admin_last_name: context.diveShopInfo.lastName,
    location: context.diveShopInfo.location,
    days: context.diveShopConfig.days.join(","),
    hours: context.diveShopConfig.hours.join(","),
    diveTypes: context.diveShopConfig.diveTypes.join(","),
  };
};

const isProdEnv = () => {
  return process.env.NODE_ENV === "production";
};

export default function DiveShopInfo() {
  const machine = React.useContext(MyContext);
  const [state, send] = useActor(machine);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(error);

  useEffect(() => {
    if (isProdEnv()) {
      postData();
    } else {
      setData({ url_hash: "test_hash" });
    }
  }, []);
  const postData = async function () {
    try {
      setLoading(true);
      const { data, error: apiError } = await supabase
        .from("dive-shop")
        .insert([getValues(state.context)]);
      if (apiError) {
        setError(apiError);
      }
      setData(data[0]);
    } catch (error) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center">
          <div>
            <CircularProgress />
          </div>
          <span className="mt-2 italic font-light">
            Generating your dive shop configuration, hold tight!
          </span>
        </div>
      ) : error ? (
        <div>
          <Alert severity="error">
            There was an error creating your dive shop config, please try again
            later. If issue persists, contact{" "}
            <Link
              target="_blank"
              rel="noopener"
              href="mailto:support@diverlist.com?subject=Issue%20creating%20Dive%20Shop%20sign-up%20form"
            >
              support@diverlist.com
            </Link>
          </Alert>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Alert severity="success">
            Your Dive Shop Reservation was successfully created!
          </Alert>
          <div className="mt-4">
            <span>Please visit</span>
            <Link
              href={data.url_hash}
              target="_blank"
              rel="noopener"
              className="ml-1"
            >
              {BASE_URL + data.url_hash}
            </Link>
            <span className="ml-1">
              to test out your new reservation system.
            </span>
          </div>
          {!isProdEnv() && (
            <div className="mt-8 flex flex-col mx-32">
              <span>Submitted</span>
              <div className="mt-2">
                {Object.entries(getValues(state.context)).map(
                  ([key, value]) => (
                    <div key={key} className="grid grid-cols-2">
                      <span className="font-bold">{key}: </span>
                      <span className="ml-2 break-words">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
