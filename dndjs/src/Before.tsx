import React, { useRef, useState, useEffect } from "react";
import useMousePosition from "hooks/useMousePosition";
import { getDropRange, isInRange } from "./util";

import "./app.css";
import "./dnd.css";

const dropRange = getDropRange(20);

const Before = () => {
  const [elements, setElements] = useState(["안", "녕", "하", "세", "요"]);

  const [dropPoint, setDropPoint] = useState(-1);
  const [mouseDownElementId, setMouseDownElementId] = useState<number>(-1);
  const [mouseDownCoordination, setMouseDownCoordination] = useState({
    xCoordination: 0,
    yCoordination: 0,
  });

  const childRefs = useRef<Array<HTMLDivElement | null>>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const mousePosition = useMousePosition();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      setMouseDownElementId(Number(e.target.id));
      if (mousePosition.pageX && mousePosition.pageY) {
        setMouseDownCoordination({
          xCoordination: mousePosition.pageX,
          yCoordination: mousePosition.pageY,
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (childRefs.current[mouseDownElementId]) {
      const el = childRefs.current[mouseDownElementId] as HTMLDivElement;
      el.style.transform = "translate3d(0, 0, 0)";
    }

    if (mousePosition.pageY && parentRef.current && childRefs.current[0]) {
      const dragHeight = mousePosition.pageY - parentRef.current.offsetTop;
      const elementHeight = childRefs.current[0].offsetHeight;

      if (mouseDownElementId !== -1) {
        const range =
          dragHeight / Number(elementHeight) -
          Math.floor(dragHeight / Number(elementHeight));

        if (isInRange(range)) {
          const moveIndex = Math.round(dragHeight / Number(elementHeight));

          if (moveIndex < 0) return;

          const arr = elements.slice();
          arr.splice(Math.round(moveIndex), 0, elements[mouseDownElementId]);
          arr.splice(mouseDownElementId, 1);
          setElements(arr);
        }
      }
    }

    setMouseDownElementId(-1);
    setDropPoint(-1);
  };

  useEffect(() => {
    // parentRef에서 children 구해서 id 값 넣어주기
  }, []);

  useEffect(() => {
    const ref = childRefs.current[mouseDownElementId];
    if (!ref) return;

    if (mousePosition.pageX && mousePosition.pageY) {
      ref.style.transform = `translate3d(${
        mousePosition.pageX - mouseDownCoordination.xCoordination
      }px, ${mousePosition.pageY - mouseDownCoordination.yCoordination}px, 0)`;
    }
  }, [mousePosition]);

  useEffect(() => {
    if (mousePosition.pageY && parentRef.current && childRefs.current[0]) {
      const dragHeight = mousePosition.pageY - parentRef.current.offsetTop;
      const elementHeight = childRefs.current[0].offsetHeight;

      if (mouseDownElementId !== -1) {
        const moveIndex = dragHeight / Number(elementHeight);
        const range =
          dragHeight / Number(elementHeight) -
          Math.floor(dragHeight / Number(elementHeight));

        if (isInRange(range)) {
          setDropPoint(Math.round(moveIndex));
          return;
        }
        setDropPoint(-1);
      }
    }
  }, [mousePosition]);

  console.log(dropPoint);

  return (
    <div
      id={String(-1)}
      ref={parentRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "120px",
        marginLeft: "10px",
      }}
    >
      {elements.map((v, i) => (
        <div style={{ position: "relative", width: "fit-content" }} key={i}>
          {i === 0 && dropPoint === i && (
            <div style={{ width: "100%", borderTop: "3px solid black" }} />
          )}

          <div
            // onD
            id={String(i)}
            ref={(el) => (childRefs.current[i] = el)}
            className={"element-style"}
            key={i}
          >
            {v}
          </div>
          {dropPoint - 1 === i && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                borderTop: "3px solid black",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Before;
