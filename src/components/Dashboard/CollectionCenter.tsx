"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import CollectionCard from "@/components/DataStats/CollectionCard";
import FacilityCalendar from "@/components/DataStats/Calender";
import ProgressBar from "@/components/DataStats/ProgressBar";
import ChartOne from "@/components/Charts/ChartOne";
import Calendar from "@/components/CollectionCenter/collection/calendar";

const ECommerce: React.FC = () => {
  return (
    <>
      <CollectionCard />
	  <br/>
	   <ProgressBar/>
     <Calendar />
    </>
  );
};

export default ECommerce;
