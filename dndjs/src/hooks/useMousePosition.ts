import { useEffect, useState } from "react";

type MousePosition = Partial<MouseEvent>;

interface MouseDownCoordinationType {
  xCoordination: number;
  yCoordination: number;
}

interface Props {
  ref: HTMLDivElement | null;
  mouseDownCoordination: MouseDownCoordinationType;
}

const useMousePosition = ({ ref, mouseDownCoordination }: Props) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const updateMousePosition = (e: MouseEvent) => {
    const { clientX, clientY, pageX, pageY, offsetX, offsetY } = e;

    setMousePosition({
      clientX,
      clientY,
      pageX,
      pageY,
      offsetX,
      offsetY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    if (!ref) return;

    if (mousePosition.pageX && mousePosition.pageY) {
      ref.style.transform = `translate3d(${
        mousePosition.pageX - mouseDownCoordination.xCoordination
      }px, ${
        mousePosition.pageY - mouseDownCoordination.yCoordination
      }px, 0px)`;
    }
  }, [mousePosition]);

  return mousePosition;
};

export default useMousePosition;
