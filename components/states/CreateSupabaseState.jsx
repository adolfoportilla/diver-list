import React, { useEffect, useState } from "react";
import { useActor } from "@xstate/react";

import { STATE_ACTIONS } from "../../utils/state-machine";
import { MyContext } from "../ReservationController";
import { createReservation } from "../../utils/api/reservation";

const CreateSupabaseReservationState = () => {
  const context = React.useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [state, send] = useActor(context.service);

  useEffect(() => {
    const context = state.context;
    const values = {
      diver_certified: context.isDiverCertified,
      reservation_type: context.reservationType,
      certification_type: context.certificationType,
      number_of_dives: context.numberOfDives,
      deepest_dive: context.deepestDive,
      last_dive: context.lastDive,
      date: context.date,
      time: context.time,
      diver_information: context.diverInformation,
      equipment_information: context.equipment,
      dive_shop_id: context.diveShopConfig.id,
    };
    setLoading(true);
    createReservation({ values })
      .then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          send({
            type: STATE_ACTIONS.COMPLETE,
          });
        }
      })
      .catch((error) => {
        setError(error.error_description || error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return null;
};

export default CreateSupabaseReservationState;
