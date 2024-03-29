import React, { useState, useEffect } from "react";
import { useActor } from "@xstate/react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import isEmpty from "lodash/isEmpty";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import supabase from "../../utils/supabase";
import { fetchDiveShop } from "../../utils/api/dive-shop";

const DiveShopConfigFetchState = () => {
  const context = React.useContext(MyContext);
  const [state, send] = useActor(context.service);

  // https://nextjs.org/docs/routing/dynamic-routes
  const router = useRouter();
  const { url_hash } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (url_hash) {
      fetchData(url_hash);
    }
  }, [url_hash]);

  const fetchData = async function (urlHash) {
    try {
      setLoading(true);
      let { data: diveShop, error: apiError } = await fetchDiveShop({
        urlHash,
      });

      if (apiError) {
        setError(apiError);
      }
      if (!isEmpty(diveShop)) {
        send({
          type: STATE_ACTIONS.FETCH_SUCCESS,
          value: diveShop,
        });
      }
    } catch (error) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-32">
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  return null;
};

export default DiveShopConfigFetchState;
