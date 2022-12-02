import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";

const Resultpage = ({ json, sample, newSize }) => {
  const [loading, setLoading] = useState(false);
  const [skeletonIndex, setSkeletonIndex] = useState(0);
  const [imageLoad, setImageLoad] = useState(false);
  const [skel, setSkel] = useState([]);
  // const skel = [
  //   [
  //     [213, 295],
  //     [189, 277],
  //     [171, 256],
  //     [150, 255],
  //     [158, 284],
  //     [160, 319],
  //     [156, 251],
  //     [158, 214],
  //     [163, 207],
  //     [170, 196],
  //     [181, 259],
  //     [174, 245],
  //     [169, 222],
  //     [146, 212],
  //     [122, 211],
  //     [120, 190],
  //   ],
  //   [
  //     [216, 296],
  //     [191, 281],
  //     [163, 269],
  //     [140, 263],
  //     [161, 289],
  //     [166, 316],
  //     [153, 267],
  //     [144, 229],
  //     [152, 215],
  //     [154, 199],
  //     [184, 259],
  //     [176, 255],
  //     [162, 236],
  //     [134, 218],
  //     [117, 208],
  //     [119, 193],
  //   ],
  //   [
  //     [213, 294],
  //     [197, 275],
  //     [186, 255],
  //     [162, 247],
  //     [165, 269],
  //     [161, 301],
  //     [171, 245],
  //     [178, 206],
  //     [181, 194],
  //     [182, 179],
  //     [233, 199],
  //     [217, 202],
  //     [193, 209],
  //     [169, 205],
  //     [142, 195],
  //     [125, 188],
  //   ],
  //   [
  //     [207, 272],
  //     [209, 245],
  //     [193, 239],
  //     [167, 240],
  //     [163, 272],
  //     [164, 306],
  //     [178, 239],
  //     [179, 204],
  //     [184, 196],
  //     [184, 185],
  //     [236, 200],
  //     [215, 204],
  //     [193, 208],
  //     [161, 204],
  //     [146, 197],
  //     [120, 185],
  //   ],
  //   [
  //     [218, 259],
  //     [218, 229],
  //     [197, 237],
  //     [172, 240],
  //     [172, 270],
  //     [164, 309],
  //     [182, 243],
  //     [180, 204],
  //     [180, 196],
  //     [185, 181],
  //     [229, 199],
  //     [212, 202],
  //     [196, 207],
  //     [166, 205],
  //     [146, 195],
  //     [123, 186],
  //   ],
  //   [
  //     [218, 263],
  //     [214, 232],
  //     [201, 237],
  //     [180, 242],
  //     [172, 269],
  //     [165, 304],
  //     [186, 239],
  //     [182, 202],
  //     [182, 195],
  //     [178, 181],
  //     [235, 200],
  //     [217, 203],
  //     [203, 203],
  //     [169, 201],
  //     [147, 195],
  //     [126, 187],
  //   ],
  //   [
  //     [226, 269],
  //     [225, 237],
  //     [227, 222],
  //     [209, 219],
  //     [209, 242],
  //     [213, 277],
  //     [216, 222],
  //     [207, 184],
  //     [202, 174],
  //     [200, 159],
  //     [238, 199],
  //     [228, 201],
  //     [219, 184],
  //     [197, 181],
  //     [181, 192],
  //     [161, 185],
  //   ],
  //   [
  //     [245, 259],
  //     [238, 231],
  //     [223, 216],
  //     [203, 218],
  //     [220, 243],
  //     [217, 260],
  //     [217, 212],
  //     [213, 178],
  //     [213, 169],
  //     [211, 154],
  //     [243, 197],
  //     [232, 201],
  //     [224, 181],
  //     [201, 179],
  //     [182, 188],
  //     [158, 182],
  //   ],
  //   [
  //     [226, 248],
  //     [218, 220],
  //     [212, 191],
  //     [196, 194],
  //     [205, 228],
  //     [218, 257],
  //     [206, 191],
  //     [200, 157],
  //     [203, 153],
  //     [207, 138],
  //     [235, 198],
  //     [222, 180],
  //     [210, 160],
  //     [189, 150],
  //     [174, 141],
  //     [165, 118],
  //   ],
  //   [
  //     [224, 253],
  //     [217, 225],
  //     [214, 192],
  //     [194, 189],
  //     [190, 222],
  //     [200, 251],
  //     [201, 187],
  //     [198, 155],
  //     [198, 143],
  //     [202, 133],
  //     [233, 202],
  //     [225, 183],
  //     [212, 159],
  //     [196, 146],
  //     [179, 137],
  //     [168, 119],
  //   ],
  //   [
  //     [218, 249],
  //     [205, 215],
  //     [209, 190],
  //     [194, 184],
  //     [169, 174],
  //     [145, 189],
  //     [202, 188],
  //     [205, 150],
  //     [201, 139],
  //     [207, 129],
  //     [239, 198],
  //     [224, 176],
  //     [219, 153],
  //     [194, 144],
  //     [183, 139],
  //     [166, 118],
  //   ],
  //   [
  //     [222, 249],
  //     [206, 216],
  //     [208, 193],
  //     [193, 181],
  //     [166, 170],
  //     [145, 182],
  //     [199, 190],
  //     [202, 150],
  //     [209, 138],
  //     [209, 125],
  //     [235, 199],
  //     [227, 181],
  //     [217, 160],
  //     [196, 144],
  //     [184, 137],
  //     [166, 116],
  //   ],
  //   [
  //     [225, 252],
  //     [200, 219],
  //     [205, 194],
  //     [191, 184],
  //     [170, 169],
  //     [144, 186],
  //     [197, 186],
  //     [201, 149],
  //     [202, 138],
  //     [205, 128],
  //     [219, 132],
  //     [228, 148],
  //     [214, 154],
  //     [192, 146],
  //     [179, 134],
  //     [166, 115],
  //   ],
  //   [
  //     [183, 224],
  //     [193, 188],
  //     [206, 170],
  //     [191, 157],
  //     [164, 166],
  //     [145, 188],
  //     [199, 160],
  //     [201, 124],
  //     [192, 119],
  //     [189, 109],
  //     [171, 112],
  //     [188, 119],
  //     [207, 124],
  //     [196, 123],
  //     [179, 127],
  //     [167, 115],
  //   ],
  //   [
  //     [176, 203],
  //     [186, 170],
  //     [210, 157],
  //     [185, 145],
  //     [164, 161],
  //     [145, 184],
  //     [198, 148],
  //     [199, 112],
  //     [189, 110],
  //     [186, 99],
  //     [205, 116],
  //     [185, 115],
  //     [164, 111],
  //     [189, 109],
  //     [174, 125],
  //     [167, 116],
  //   ],
  //   [
  //     [175, 168],
  //     [178, 149],
  //     [205, 144],
  //     [188, 143],
  //     [163, 158],
  //     [139, 180],
  //     [197, 143],
  //     [194, 113],
  //     [189, 108],
  //     [185, 98],
  //     [169, 108],
  //     [187, 116],
  //     [202, 116],
  //     [190, 109],
  //     [174, 122],
  //     [169, 118],
  //   ],
  //   [
  //     [197, 207],
  //     [197, 173],
  //     [209, 151],
  //     [184, 143],
  //     [162, 154],
  //     [139, 172],
  //     [196, 145],
  //     [198, 109],
  //     [194, 99],
  //     [194, 87],
  //     [211, 107],
  //     [193, 116],
  //     [174, 109],
  //     [196, 108],
  //     [178, 124],
  //     [168, 117],
  //   ],
  //   [
  //     [192, 198],
  //     [184, 160],
  //     [184, 136],
  //     [162, 127],
  //     [147, 147],
  //     [131, 170],
  //     [173, 131],
  //     [174, 88],
  //     [170, 82],
  //     [171, 72],
  //     [182, 90],
  //     [187, 111],
  //     [176, 97],
  //     [164, 90],
  //     [144, 80],
  //     [132, 64],
  //   ],
  //   [
  //     [165, 163],
  //     [188, 153],
  //     [176, 129],
  //     [162, 125],
  //     [141, 157],
  //     [126, 174],
  //     [164, 125],
  //     [164, 92],
  //     [163, 84],
  //     [158, 79],
  //     [173, 104],
  //     [182, 111],
  //     [178, 93],
  //     [160, 89],
  //     [137, 80],
  //     [131, 63],
  //   ],
  //   [
  //     [168, 155],
  //     [192, 144],
  //     [182, 127],
  //     [159, 125],
  //     [144, 151],
  //     [134, 172],
  //     [163, 123],
  //     [163, 87],
  //     [163, 79],
  //     [158, 69],
  //     [173, 90],
  //     [183, 104],
  //     [182, 89],
  //     [153, 82],
  //     [134, 78],
  //     [130, 64],
  //   ],
  //   [
  //     [167, 152],
  //     [188, 141],
  //     [172, 122],
  //     [151, 124],
  //     [140, 156],
  //     [132, 171],
  //     [167, 126],
  //     [163, 83],
  //     [166, 71],
  //     [166, 55],
  //     [168, 92],
  //     [180, 102],
  //     [179, 82],
  //     [155, 78],
  //     [137, 80],
  //     [125, 68],
  //   ],
  //   [
  //     [171, 157],
  //     [192, 145],
  //     [176, 125],
  //     [155, 129],
  //     [142, 154],
  //     [133, 169],
  //     [167, 126],
  //     [166, 88],
  //     [170, 75],
  //     [167, 59],
  //     [175, 88],
  //     [184, 105],
  //     [181, 84],
  //     [152, 83],
  //     [131, 73],
  //     [125, 58],
  //   ],
  //   [
  //     [168, 156],
  //     [191, 147],
  //     [178, 128],
  //     [155, 129],
  //     [141, 155],
  //     [135, 167],
  //     [164, 122],
  //     [162, 86],
  //     [167, 71],
  //     [161, 61],
  //     [174, 91],
  //     [178, 101],
  //     [176, 81],
  //     [150, 84],
  //     [133, 77],
  //     [130, 68],
  //   ],
  //   [
  //     [162, 163],
  //     [180, 133],
  //     [166, 105],
  //     [151, 101],
  //     [155, 130],
  //     [137, 158],
  //     [161, 99],
  //     [156, 67],
  //     [158, 55],
  //     [157, 43],
  //     [196, 28],
  //     [183, 44],
  //     [166, 57],
  //     [152, 64],
  //     [126, 74],
  //     [129, 62],
  //   ],
  //   [
  //     [247, 92],
  //     [219, 80],
  //     [180, 82],
  //     [168, 94],
  //     [165, 128],
  //     [156, 156],
  //     [177, 86],
  //     [166, 56],
  //     [167, 51],
  //     [168, 44],
  //     [198, 26],
  //     [193, 38],
  //     [177, 51],
  //     [152, 61],
  //     [133, 70],
  //     [129, 64],
  //   ],
  //   [
  //     [250, 92],
  //     [223, 82],
  //     [189, 88],
  //     [163, 95],
  //     [172, 124],
  //     [157, 156],
  //     [180, 95],
  //     [170, 50],
  //     [169, 37],
  //     [167, 25],
  //     [199, 26],
  //     [188, 35],
  //     [176, 48],
  //     [157, 55],
  //     [168, 43],
  //     [189, 30],
  //   ],
  //   [
  //     [252, 94],
  //     [223, 83],
  //     [183, 87],
  //     [170, 101],
  //     [169, 133],
  //     [159, 153],
  //     [177, 93],
  //     [162, 58],
  //     [157, 50],
  //     [156, 43],
  //     [199, 26],
  //     [182, 42],
  //     [174, 50],
  //     [153, 64],
  //     [147, 78],
  //     [155, 113],
  //   ],
  //   [
  //     [188, 346],
  //     [159, 344],
  //     [202, 337],
  //     [171, 332],
  //     [149, 343],
  //     [162, 351],
  //     [174, 334],
  //     [149, 293],
  //     [135, 294],
  //     [130, 276],
  //     [177, 327],
  //     [176, 314],
  //     [164, 294],
  //     [136, 305],
  //     [142, 338],
  //     [139, 347],
  //   ],
  //   [
  //     [95, 351],
  //     [104, 321],
  //     [122, 307],
  //     [100, 307],
  //     [96, 342],
  //     [93, 353],
  //     [109, 312],
  //     [90, 238],
  //     [81, 220],
  //     [71, 190],
  //     [101, 295],
  //     [99, 263],
  //     [92, 226],
  //     [92, 228],
  //     [111, 282],
  //     [77, 321],
  //   ],
  // ];
  const [fetch, setFetch] = useState(-1);

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  // const outCanvas = canvasRef.current;
  // const drawCanvas = canvasRef2.current;

  const renderSkel = (skeldata, lineWidth, color) => {
    // canvasRef2.current.width = newSize.width;
    // canvasRef2.current.height = newSize.height;
    console.log(skel);
    const ctx = canvasRef2.current.getContext("2d");
    console.log(skeldata);
    console.log("start draw skel");
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(
      (skeldata[8][0] + skeldata[9][0]) / 2,
      (skeldata[8][1] + skeldata[9][1]) / 2,
      5,
      0,
      Math.PI * 2
    );
    ctx.moveTo(
      (skeldata[8][0] + skeldata[9][0]) / 2,
      (skeldata[8][1] + skeldata[9][1]) / 2
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.moveTo(
      (skeldata[8][0] + skeldata[9][0]) / 2,
      (skeldata[8][1] + skeldata[9][1]) / 2
    );
    ctx.lineTo(skeldata[7][0], skeldata[7][1]);
    ctx.arc(skeldata[7][0], skeldata[7][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[7][0], skeldata[7][1]);

    // ctx.lineTo(skeldata[13][0], skeldata[13][1]);
    ctx.arc(skeldata[13][0], skeldata[13][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[13][0], skeldata[13][1]);

    ctx.lineTo(skeldata[14][0], skeldata[14][1]);
    ctx.arc(skeldata[14][0], skeldata[14][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[14][0], skeldata[14][1]);

    ctx.lineTo(skeldata[15][0], skeldata[15][1]);
    ctx.arc(skeldata[15][0], skeldata[15][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[15][0], skeldata[15][1]);

    ctx.moveTo(skeldata[7][0], skeldata[7][1]);
    ctx.lineTo(skeldata[12][0], skeldata[12][1]);
    ctx.arc(skeldata[12][0], skeldata[12][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[12][0], skeldata[12][1]);

    ctx.lineTo(skeldata[11][0], skeldata[11][1]);
    ctx.arc(skeldata[11][0], skeldata[11][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[11][0], skeldata[11][1]);

    ctx.lineTo(skeldata[10][0], skeldata[10][1]);
    ctx.arc(skeldata[10][0], skeldata[10][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[10][0], skeldata[10][1]);

    ctx.moveTo(skeldata[7][0], skeldata[7][1]);

    ctx.lineTo(skeldata[6][0], skeldata[6][1]);
    ctx.arc(skeldata[6][0], skeldata[6][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[6][0], skeldata[6][1]);

    ctx.lineTo(skeldata[3][0], skeldata[3][1]);
    ctx.arc(skeldata[3][0], skeldata[3][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[3][0], skeldata[3][1]);

    ctx.lineTo(skeldata[4][0], skeldata[4][1]);
    ctx.arc(skeldata[4][0], skeldata[4][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[4][0], skeldata[4][1]);

    ctx.lineTo(skeldata[5][0], skeldata[5][1]);
    ctx.arc(skeldata[5][0], skeldata[5][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[5][0], skeldata[5][1]);

    ctx.moveTo(skeldata[6][0], skeldata[6][1]);
    ctx.lineTo(skeldata[2][0], skeldata[2][1]);
    ctx.arc(skeldata[2][0], skeldata[2][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[2][0], skeldata[2][1]);

    ctx.lineTo(skeldata[1][0], skeldata[1][1]);
    ctx.arc(skeldata[1][0], skeldata[1][1], 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(skeldata[1][0], skeldata[1][1]);

    //draw body
    ctx.lineTo(skeldata[0][0], skeldata[0][1]);
    ctx.arc(skeldata[0][0], skeldata[0][1], 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.stroke();
  };

  useEffect(() => {
    if (!imageLoad) {
      const ctx = canvasRef.current.getContext("2d");
      const image = new Image();
      image.src = sample;
      console.log("newSize:", newSize);
      image.onload = () => {
        canvasRef.current.width = newSize.width;
        canvasRef.current.height = newSize.height;

        ctx.drawImage(image, 0, 0, 720, 720);
        setImageLoad(true);
      };
    } else {
      if (fetch === -1) {
        console.log(json);
        const fetchData = async () => {
          axios
            .post("http://yjyjpc.iptime.org:55555/holdImg/route/", json, {
              headers: {
                "Content-Type": `application/json`,
              },
            })
            .then((res) => {
              console.log("skel data post test: ", res);
              console.log(res.data.result);
              setSkel(res.data.result);
            })
            .catch((err) => {
              console.log("select hold post err", err);
            });
        };
        fetchData();
        setFetch(1);
      } else if (skel.length !== 0) {
        console.log("skel확인: ", skel);
        const rw = 1;
        const rh = 1;
        const skeldata = skel[skeletonIndex].map((skel) => {
          const rX = skel[1] * rw;
          const rY = skel[0] * rh;
          console.log("rx,ry: ", rw, rh, skel[0], skel[1]);
          return [rX, rY];
        });
        canvasRef2.current.width = newSize.width;
        canvasRef2.current.height = newSize.height;
        // console.log("skelData: ", skeldata);
        renderSkel(skeldata, 8, "rgba(0,0,0,0.5)");
        renderSkel(skeldata, 5, "rgba(0,0,255,0.0)");
      }
    }
  }, [fetch, skel, skeletonIndex, imageLoad]);

  //대기 중일 때
  //아직 articles 값이 설정되지 않았을 때
  // if (!skel) {
  //   return null;
  // }

  //articles 값이 유효할 때
  return (
    <div className="result-wrapper">
      <button
        className="button-9"
        onClick={() => {
          console.log(skeletonIndex);
          if (skeletonIndex > 0) setSkeletonIndex(skeletonIndex - 1);
        }}
      >
        pre
      </button>
      <div
        className="canvasArea"
        style={{ height: newSize.height, width: newSize.width }}
      >
        <canvas id="canvas" ref={canvasRef} />
        <canvas id="canvas2" ref={canvasRef2} />
      </div>

      <button
        className="button-9"
        onClick={() => {
          if (skeletonIndex < skel.length) setSkeletonIndex(skeletonIndex + 1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default Resultpage;
