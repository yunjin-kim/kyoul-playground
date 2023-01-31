import useMousePosition from "hooks/useMousePosition";
import React, { useRef, useState } from "react";

const App = () => {
  const [mouseDownElementId, setMouseDownElementId] = useState<number>(-1);
  const [mouseDownCoordination, setMouseDownCoordination] = useState({
    xCoordination: 0,
    yCoordination: 0,
  });
  const refArray = useRef<Array<HTMLDivElement | null>>([]);

  const mousePosition = useMousePosition({
    ref: refArray.current[mouseDownElementId],
    mouseDownCoordination,
  });

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
    setMouseDownElementId(-1);
    if (refArray.current[mouseDownElementId]) {
      const el = refArray.current[mouseDownElementId] as HTMLDivElement;
      el.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      id={String(-1)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          id={String(i)}
          ref={(el) => (refArray.current[i] = el)}
          style={{
            width: "300px",
            height: "50px",
            border: "1px solid black",
          }}
          key={i}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default App;
