import Before from "Before";
import DragAndDrop from "DragAndDrop";

import "./app.css";

const App = () => {
  const elements = ["안", "녕", "하", "세", "요"];

  return (
    <>
      {/* <DragAndDrop>
        {elements.map((v, i) => (
          <div className={"element-style"} id={String(i)} key={`${v}${i}`}>
            {v}
          </div>
        ))}
      </DragAndDrop> */}
      <Before />
    </>
  );
};

export default App;
