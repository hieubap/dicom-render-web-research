import logo from "./logo.svg";
import "./App.css";
import { DicomViewer } from "./DicomViewer";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <DicomViewer
        imageSrc={
          "weburi:/vrpacs-scu/study-get-public?link=jI2+rDiwQJfPjsMi9TmCcFbkpq9Q6RMffSwgwGbgyM3Fn+j3eqpVhL2BpkaESv1nNZbGxzuYd25iUEG8G7eDktWV+Pd6oEmYu4eyTola_ms_lcfKJ5tlcnALCv1c8MHAxZ_o9meiSZi7jL9OiUD6Zz+Wx9JpqA.982YISP37Z1m_5c6tj11EA&file=thum.jpg"
        }
      />
    </div>
  );
}

export default App;
