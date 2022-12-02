import { useEffect, useState, useRef } from "react";
import TitleArea from "./components/TitleArea";
import ViewArea from "./components/ViewArea";
import Resultpage from "./components/ResultPage";
import { useLocation } from "react-router";
import axios from "axios";
// const boxe = [
//   [138, 37, 165, 60],
//   [179, 216, 219, 272],
//   [206, 267, 231, 301],
//   [244, 236, 290, 288],
//   [272, 264, 295, 292],
//   [294, 243, 314, 265],
//   [319, 268, 340, 288],
//   [231, 318, 244, 331],
//   [222, 330, 242, 350],
//   [243, 347, 302, 376],
//   [278, 376, 310, 393],
//   [298, 394, 368, 427],
//   [336, 216, 358, 238],
//   [359, 218, 377, 240],
//   [338, 242, 359, 263],
//   [324, 290, 412, 365],
//   [362, 370, 380, 394],
//   [382, 368, 426, 409],
//   [359, 417, 402, 439],
//   [200, 334, 225, 354],
//   [194, 368, 220, 400],
//   [208, 418, 259, 443],
//   [252, 396, 296, 421],
//   [302, 98, 324, 125],
//   [378, 164, 398, 187],
//   [381, 186, 406, 219],
//   [403, 191, 423, 212],
//   [358, 224, 415, 280],
//   [422, 114, 445, 136],
//   [349, 101, 412, 161],
//   [148, 77, 202, 166],
//   [116, 215, 177, 292],
//   [86, 396, 113, 425],
//   [350, 439, 370, 461],
//   [369, 439, 400, 464],
//   [400, 468, 415, 483],
//   [421, 57, 444, 82],
//   [407, 328, 450, 353],
//   [370, 463, 399, 489],
//   [200, 6, 227, 36],
//   [197, 0, 220, 10],
//   [108, 0, 183, 77],
//   [91, 0, 121, 9],
//   [50, 389, 73, 416],
//   [49, 415, 90, 462],
//   [34, 528, 64, 550],
//   [104, 519, 141, 557],
//   [185, 495, 227, 523],
//   [266, 494, 306, 528],
//   [222, 550, 254, 584],
//   [71, 437, 260, 534],
//   [104, 505, 299, 608],
//   [89, 580, 126, 627],
//   [1, 595, 58, 664],
//   [0, 666, 35, 719],
//   [188, 675, 198, 692],
//   [203, 706, 226, 719],
//   [235, 662, 250, 701],
//   [282, 649, 304, 680],
//   [277, 676, 290, 719],
//   [297, 608, 328, 655],
//   [153, 606, 332, 719],
//   [370, 643, 389, 675],
//   [362, 593, 393, 626],
//   [342, 577, 363, 595],
//   [310, 559, 340, 594],
//   [346, 528, 371, 551],
//   [368, 553, 391, 576],
//   [396, 606, 416, 625],
//   [388, 641, 418, 676],
//   [329, 657, 370, 700],
//   [382, 679, 424, 716],
//   [464, 685, 486, 714],
//   [453, 671, 501, 687],
//   [484, 688, 509, 713],
//   [555, 699, 569, 711],
//   [592, 704, 606, 716],
//   [615, 679, 631, 696],
//   [565, 641, 619, 683],
//   [559, 631, 581, 652],
//   [446, 468, 464, 486],
//   [467, 478, 495, 524],
//   [516, 516, 533, 535],
//   [538, 517, 557, 536],
//   [560, 515, 583, 535],
//   [560, 535, 592, 565],
//   [538, 562, 559, 581],
//   [587, 568, 604, 587],
//   [609, 575, 646, 618],
//   [564, 592, 620, 641],
//   [650, 608, 690, 646],
//   [616, 644, 667, 690],
//   [628, 713, 649, 719],
//   [538, 653, 562, 670],
//   [541, 607, 564, 626],
//   [465, 609, 492, 635],
//   [470, 631, 491, 656],
//   [438, 606, 460, 621],
//   [439, 702, 467, 719],
//   [452, 538, 519, 600],
//   [486, 534, 508, 554],
//   [414, 475, 442, 518],
//   [384, 484, 421, 524],
//   [487, 421, 511, 440],
//   [530, 434, 570, 471],
//   [503, 460, 543, 500],
//   [547, 416, 589, 448],
//   [586, 399, 617, 422],
//   [582, 383, 604, 401],
//   [633, 362, 655, 400],
//   [635, 325, 662, 348],
//   [605, 300, 636, 333],
//   [509, 351, 538, 374],
//   [485, 320, 514, 349],
//   [481, 305, 514, 326],
//   [513, 294, 532, 314],
//   [432, 352, 474, 378],
//   [523, 204, 541, 229],
//   [571, 175, 591, 198],
//   [559, 257, 579, 278],
//   [467, 173, 501, 218],
//   [406, 128, 470, 181],
//   [497, 77, 523, 103],
//   [550, 47, 572, 68],
//   [424, 32, 446, 54],
//   [652, 6, 667, 23],
//   [682, 36, 700, 62],
//   [597, 0, 679, 71],
//   [550, 0, 633, 49],
//   [429, 0, 451, 8],
//   [396, 0, 462, 17],
//   [468, 318, 479, 331],
//   [608, 232, 627, 254],
//   [661, 226, 683, 253],
//   [624, 121, 642, 146],
//   [676, 113, 694, 138],
//   [529, 323, 621, 422],
//   [571, 340, 687, 451],
//   [617, 548, 653, 570],
//   [562, 448, 693, 573],
// ];

const App = () => {
  const [pageIndex, setpageIndex] = useState(0);
  const [result, setResult] = useState({});
  const [submitCheck, setSubmitCheck] = useState(-1);
  const [buttonText, setButttonText] = useState("next-button");
  const [boxes, setBoxes] = useState([]);
  const [imgId, setimgId] = useState(-1);
  const [squareImage, setSquareImage] = useState({});
  const newSize = useRef({
    width: 0,
    height: 0,
  });
  let ratio = 0;

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

    // 입력 이미지 위치지정
    const diff = Math.abs(inW - inH);
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
  }, [boxes]);
  const handlePost = async () => {
    var formData = new FormData();
    var file = base64toFile(
      canvasRef.current.offCanvas.toDataURL(),
      "image.jpg"
    );
    console.log("test: ", canvasRef.current.offCanvas.width);
    formData.append("image", file);
    fetch("http://yjyjpc.iptime.org:55555/holdImg/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          console.log(response.coordinates);
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
        {result && Object.keys(result).length === 0 && boxes !== [] ? (
          <div className="container">
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

            <div className="buttonArea">
              <div className="item">
                <button
                  id="previous-button"
                  className="button-9"
                  onClick={() => {
                    if (pageIndex > 0) {
                      setpageIndex(pageIndex - 1);
                      // } else if (pageIndex === 2) {
                      //   setState({ ...state, resultPage: 1 });
                      // }
                      if (pageIndex === 2) {
                        setButttonText("next-button");
                      }
                    }
                  }}
                >
                  pre
                </button>
                <i
                  className="fa fa-long-arrow-right arrow2"
                  aria-hidden="true"
                ></i>
              </div>
              <button
                id="next-button"
                className="button-9"
                onClick={() => {
                  if (pageIndex <= 1) {
                    setpageIndex(pageIndex + 1);
                    if (pageIndex === 1) {
                      // setState({ ...state, resultPage: 1 });
                      setButttonText("submit");
                    }
                  }
                  if (pageIndex === 2) {
                    setSubmitCheck(1);
                  }
                }}
              >
                {buttonText}
              </button>
            </div>
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
