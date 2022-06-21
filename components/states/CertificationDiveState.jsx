import React from "react";
import StatePage from "./shared/StatePage";
import StateTitle from "./shared/StateTitle";
import CardComponent from "./shared/CardComponent";
import Image from "next/image";

const CertificationDiveState = () => {
  return (
    <StatePage>
      <StateTitle title="Select Certification" />
      <div className="flex space-x-16">
        <CardComponent
          icon={
            <Image
              src="/icons/begginer-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Open Water"
          onClick={() => console.log("testing")}
        />
        <CardComponent
          icon={
            <Image
              src="/icons/advanced-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Advanced Open Water"
          onClick={() => console.log("testing")}
        />
        <CardComponent
          icon={
            <Image
              src="/icons/rescue-diver.svg"
              alt=""
              width={150}
              height={150}
            />
          }
          text="Rescue Diver"
          onClick={() => console.log("testing")}
        />
      </div>
    </StatePage>
  );
};

export default CertificationDiveState;
