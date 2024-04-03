import React from "react";
import ListMovie from "./ListMovie/ListMovie";
import TabMovie from "./TabMovie/TabMovie";
import Slider from "./Slice/Slider";

export default function HomePage() {
  return (
    <div>
      <Slider />
      <div className="container mx-auto">
        <ListMovie /> 
        <TabMovie />
      </div>
    </div>
  );
}
