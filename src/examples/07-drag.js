import React, { useEffect, useRef, useContext } from "react";
import "./lib/drag.css";

import useDragDrop from "./lib/useDragDrop";

const list = [
  {
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586970234373&di=a665d347ed7acfed0f39aad0bb78509a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F05%2F20150405H5939_PJwYi.jpeg",
    title: "万事屋找我"
  },
  {
    title: "吃吃吃……",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586970602470&di=e3071fc352ca96f73bf2e75725d3f7bf&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F31%2F20120831140113_ayLse.thumb.700_0.jpeg"
  },
  {
    title: "Egg",
    src:
      "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=968093909,4033932240&fm=26&gp=0.jpg"
  }
];

export default function App() {
  return <DraggableList list={list} Card={Card} />;
}

function cls(def, ...conditions) {
  const list = [def];
  conditions.forEach(cond => {
    if (cond[0]) {
      list.push(cond[1]);
    }
  });
  return list.join(" ");
}

function Card({ title, src }) {
  return (
    <div className="card">
      <img src={src} />
      <span className="text">{title}</span>
    </div>
  );
}
export function DraggableList({ list, Card }) {
  const { dragList, createDropperProps, createDraggerProps } = useDragDrop(
    list
  );
  return (
    <div>
      {dragList.map((item, i) => {
        if (item.type === "BAR") {
          return <Bar id={i} {...createDropperProps(i)} key={item.id} />;
        } else {
          return (
            <Draggable {...createDraggerProps(i)}>
              <Card {...item.data} />
            </Draggable>
          );
        }
      })}
    </div>
  );
}

const Draggable = React.memo(
  ({ id, eventHandlers, dragging, children, updateHeight }) => {
    const divRef = useRef(null);

    useEffect(() => {
      updateHeight(divRef.current.clientHeight);
    }, []);

    return (
      <div
        ref={divRef}
        {...eventHandlers}
        // {...eventHandlers}
        className={cls("draggable", [id === dragging, "dragging"])}
        draggable={true}
      >
        {children}
      </div>
    );
  },
  (prev, next) => prev.dragging === next.dragging
);

function Bar({ id, dragging, heights, dragOver, eventHandlers }) {
  if (id === dragging + 1) {
    return null;
  }
  return (
    <div
      {...eventHandlers}
      className={cls("draggable--bar", [dragOver === id, "dragover"])}
    >
      <div
        className="inner"
        style={{
          height: id === dragOver ? heights[dragging] : 0 + "px"
        }}
      />
    </div>
  );
}
