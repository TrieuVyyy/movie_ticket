import React from "react";
import TabMovie from "./TabMovie/TabMovie";
import ListBanner from "./Banner/ListBanner";
import ListMovie from "./ListMovie/ListMovie";
import { UpCircleFilled } from "@ant-design/icons";
import { animateScroll as scroll } from "react-scroll";
import { useScrollY } from "../../component/hooks/useScrollY";

const ScrollToTop = () => {
  scroll.scrollToTop();
};

export default function HomePage() {
  const [scrollY] = useScrollY();
  return (
    <div>
      <ListBanner idSection="home" />
      <div className="container mx-auto">
        <ListMovie idSection="phim" />
        <TabMovie idSection="lichchieu" />
      </div>

      <UpCircleFilled
        onClick={() => ScrollToTop()}
        style={{ visibility: `${scrollY > 600 ? "visible" : "hidden"}` }}
        className="btn_gototop fited text-5xl"
      />
    </div>
  );
}
