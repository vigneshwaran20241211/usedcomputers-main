"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import FacilityCard from "@/components/DataStats/FacilityCard";
import FacilityCalendar from "@/components/FacilityCenter/collection/calendar";
import CardParts from "@/components/DataStats/CardParts";
import ChartOne from "@/components/Charts/ChartOne";

const ECommerce: React.FC = () => {
  return (
    <>
      <FacilityCard />
	  <br/>
	   <CardParts/>
	  <FacilityCalendar/>
    </>
  );
};

export default ECommerce;
