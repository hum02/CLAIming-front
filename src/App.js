import { useEffect, useState, useRef } from "react";
import TitleArea from "./components/TitleArea";
import ViewArea from "./components/ViewArea";
import Resultpage from "./components/ResultPage";
import { useLocation } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const App = () => {
  const [pageIndex, setpageIndex] = useState(0);
  const [result, setResult] = useState({});
  const [submitCheck, setSubmitCheck] = useState(-1);
  const [boxes, setBoxes] = useState([]);
  const [imgId, setimgId] = useState(-1);
  const [squareImage, setSquareImage] = useState({});
  const newSize = useRef({
    width: 0,
    height: 0,
  });
  let ratio = 0;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 모달창 노출
  console.log("보내기전 : ", result);
  const json = JSON.stringify(result);
  const canvasRef = useRef(null);
  const location = useLocation();
  const image_64 = location.state.image;
  const image = new Image();
  image.src = image_64;
  function base64toFile(base_data, filename) {
    var arr = base_data.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  //이미지 정사각형화
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.offCanvas = document.createElement("canvas");
    const squareCanvas = canvas.offCanvas;
    const ctx = squareCanvas.getContext("2d");
    const inW = image.width;
    const inH = image.height;

    // const squareLength = Math.max(inW, inH);
    const squareLength = 720;
    squareCanvas.width = squareLength;
    squareCanvas.height = squareLength;
    console.log(squareLength);
    ctx.width = squareLength;
    ctx.height = squareLength;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, squareLength, squareLength);

    if (inW > inH) {
      ratio = 720 / inW;
      ctx.drawImage(image, 0, 0, 720, inH * ratio);
    } else {
      ratio = 720 / inH;
      ctx.drawImage(image, 0, 0, inW * ratio, 720);
    }
    newSize.current.width = inW * ratio;
    newSize.current.height = inH * ratio;

    setSquareImage(squareCanvas.toDataURL());

    if (result && Object.keys(result).length === 0) {
      if (boxes.length === 0) handlePost();
    }
  }, [boxes, loading]);
  const handlePost = async () => {
    setLoading(false);
    var formData = new FormData();
    var file = base64toFile(
      canvasRef.current.offCanvas.toDataURL(),
      "image.jpg"
    );
    formData.append("image", file);
    fetch("http://yjyjpc.iptime.org:55555/holdImg/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log("response cord", response.coordinates);
          setBoxes(
            response.coordinates.map((box) => [
              box[1],
              box[0],
              box[3] - box[1],
              box[2] - box[0],
            ])
          );
          setimgId(response.id);
        }
        setLoading(true);
      });
  };
  const params = {
    options: {
      colors: {
        selected: "rgba(0,0,255,0.9)",
        unselected: "rgba(0,0,0,0.8)",
        startEnd: "rgba(255,255,100,1)",
        tophold: "rgba(255,55,44,1)",
      },
    },
  };
  return (
    <div>
      <div className="container">
        <TitleArea pageIndex={pageIndex} submitCheck={submitCheck}></TitleArea>
        {Object.keys(result).length === 0 ? (
          // !loading ? (
          //   <div>이미지를 분석중입니다 - 로딩 컴포넌트로 대체</div>
          // ) : (
          <div className="view-container">
            <button
              id="previous-button"
              className="index-button"
              onClick={() => {
                if (pageIndex > 0) {
                  setpageIndex(pageIndex - 1);
                }
              }}
            >
              <IoIosArrowBack size={40} color="black" />
            </button>
            <ViewArea
              boxes={boxes}
              imgId={imgId}
              options={params.options}
              pageIndex={pageIndex}
              setpageIndex={setpageIndex}
              setResult={setResult}
              submitCheck={submitCheck}
              sample={squareImage}
              newSize={newSize.current}
            />
            <button
              id="next-button"
              className="index-button"
              onClick={() => {
                if (pageIndex <= 1) {
                  setpageIndex(pageIndex + 1);
                }
                if (pageIndex === 2) {
                  setSubmitCheck(1);
                }
              }}
            >
              <IoIosArrowForward size={40} color="black" />
            </button>
          </div>
        ) : (
          <Resultpage
            json={json}
            sample={squareImage}
            newSize={newSize.current}
          />
        )}
      </div>
      <canvas id="main-canvas" ref={canvasRef} />
    </div>
  );
};
export default App;
