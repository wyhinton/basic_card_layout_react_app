import React, { useEffect, useState } from "react";
// import _ from "lodash";
import Clock from "./Clock";
import IFrameView from "./IFrameView";
import GridLayout, {
  WidthProvider,
  Responsive,
  Layouts,
  Layout,
} from "react-grid-layout";
import "../css/cardLayout.css";
import ViewCard from "./Card";
import { useStoreState, useStoreActions } from "../hooks";
import CardData from "../model/card_model";

export const CardGrid = (): JSX.Element => {
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const availableCards = useStoreState((state) => state.appData.availableCards);
  const ResponsiveGridLayout = WidthProvider(Responsive);

  useEffect(() => {
    console.log("cards changed");
    console.log(availableCards);
    console.log(size.y);
  }, [availableCards]);

  const layout: Layout[] = [
    { i: "0", x: 0, y: 0, w: 1, h: 1, static: true },
    { i: "1", x: 1, y: 0, w: 1, h: 1, minW: 2, maxW: 4 },
    { i: "2", x: 2, y: 0, w: 1, h: 1 },
    { i: "3", x: 3, y: 0, w: 1, h: 1 },
    { i: "4", x: 0, y: 2, w: 1, h: 1 },
    { i: "5", x: 1, y: 2, w: 1, h: 1 },
    { i: "6", x: 2, y: 2, w: 1, h: 1 },
    { i: "7", x: 3, y: 2, w: 1, h: 1 },
    { i: "clock", x: 0, y: 0, w: 2, h: 1 },
  ];
  const layouts: Layouts = {
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xxs: layout,
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
      rowHeight={size.y / 3}
      margin={[20, 20]}
    >
      <div key={"clock"}>
        <ViewCard>
          <Clock />
        </ViewCard>
      </div>
      {availableCards.map((card: CardData, i: number) => {
        console.log(i.toString());
        return (
          <div key={i} data-grid={{ i }}>
            <ViewCard key={i.toString()} data={availableCards[i]}>
              <IFrameView src="https://www.youtube.com/embed/tgbNymZ7vqY" />
            </ViewCard>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default CardGrid;
