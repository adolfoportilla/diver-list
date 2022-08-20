import React, { useEffect } from "react";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import supabase from "../../utils/supabase";

const CreateSupabaseReservationState = () => {
  const machine = React.useContext(MyContext);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [state, send] = useActor(machine);

  useEffect(() => {
    const context = state.context;
    const body = {
      diver_certified: context.isDiverCertified,
      reservation_type: context.reservationType,
      certification_type: context.certificationType,
      number_of_dives: context.numberOfDives,
      deepest_dive: context.deepestDive,
      last_dive: context.lastDive,
      date: context.date,
      time: context.time,
      diver_information: context.diverInformation,
      dive_shop_id: context.diveShopConfig.id,
    };
    // TODO(adolfo): this is sending 2 requests, make sure we only send one
    if (!loading) {
      postData(body);
    }
  }, []);

  const postData = async function (diveShop) {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("reservations")
        .insert([diveShop]);
      if (error) {
        setError(error);
      } else {
        send({
          type: STATE_ACTIONS.COMPLETE,
        });
      }
    } catch (error) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return null;
};

export default CreateSupabaseReservationState;
