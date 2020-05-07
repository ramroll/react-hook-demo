import React, { useState, useRef, useEffect, useMemo } from "react";
const DRAGGABLE = "DRAGGABLE";
const BAR = "BAR";

function draggable(item, id) {
  return {
    type: DRAGGABLE,
    id,
    data: item
  };
}

function insertBars(list) {
  let i = 0;
  const newBar = () => {
    return {
      type: BAR,
      id: i++
    };
  };
  return [newBar()].concat(
    ...list.map(item => {
      return [draggable(item, i++), newBar()];
    })
  );
}

function calcChanging(list, drag, drop) {
  list = list.slice();

  const dragItem = list[drag];

  const dir = drag > drop ? -2 : 2;
  const end = dir > 0 ? drop - 1 : drop + 1;

  for (let i = drag; i != end; i += dir) {
    list[i] = list[i + dir];
  }
  list[end] = dragItem;

  return list;
}

export default function useDragDrop(list) {
  const [dragList, setDragList] = useState(insertBars(list));
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const heights = useMemo(() => [], []);

  return {
    dragList,
    createDropperProps: id => {
      return {
        dragging,
        dragOver,
        heights,
        eventHandlers: {
          onDragOver: e => {
            e.preventDefault();
            setDragOver(id);
          },
          onDragLeave: e => {
            e.preventDefault();
            setDragOver(null);
          },
          onDrop: e => {
            e.preventDefault();
            setDragOver(null);
            setDragList(list => {
              return calcChanging(list, dragging, id);
            });
          }
        }
      };
    },
    createDraggerProps: id => {
      return {
        id,
        dragging,
        key: id,
        updateHeight: height => {
          heights[id] = height;
        },
        eventHandlers: {
          onDragStart: () => {
            setDragging(id);
          },
          onDragEnd: () => {
            setDragging(null);
          }
        }
      };
    }
  };
}
