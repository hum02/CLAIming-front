import React, { useState, useRef, useEffect } from "react";
import "../App.css";

const ViewArea = (props) => {
  const [checkedBox, setCheckedBox] = useState([]);
  const [startHoldBox, setStartHoldBox] = useState([]);
  const [topHoldBox, setTopHoldBox] = useState([]);
  const [imageLoad, setImageLoad] = useState(false);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const drawCanvas = canvasRef2.current;

  const outCanvas = canvasRef.current;
  const {
    boxes,
    imgId,
    options,
    pageIndex,
    setpageIndex,
    setResult,
    submitCheck,
    sample,
    newSize,
  } = props;

  const drawBox = (box, color, lineWidth, index, ctx) => {
    if (!box || typeof box === "undefined") return null;
    const coord = box.coord ? box.coord : box;
    let [x, y, width, height] = [0, 0, 0, 0];
    if (
      typeof coord.xmin !== "undefined" &&
      typeof coord.xmax !== "undefined" &&
      typeof coord.ymin !== "undefined" &&
      typeof coord.ymax !== "undefined"
    ) {
      // coord is an object containing xmin, xmax, ymin, ymax attributes
      // width is absolute value of (xmax - xmin)
      // height is absolute value of (ymax - ymin)
      // absolute value takes care of various possible referentials:
      //   - sometimes 0,0 is top-left corner
      //   - sometimes 0,0 is bottom-left corner
      [x, y, width, height] = [
        Math.min(coord.xmin, coord.xmax),
        Math.min(coord.ymin, coord.ymax),
        Math.max(coord.xmin, coord.xmax) - Math.min(coord.xmin, coord.xmax),
        Math.max(coord.ymin, coord.ymax) - Math.min(coord.ymin, coord.ymax),
      ];
    } else {
      // coord is an array containing [x, y, width, height] values
      [x, y, width, height] = coord;
    }

    if (x < lineWidth / 2) {
      x = lineWidth / 2;
    }
    if (y < lineWidth / 2) {
      y = lineWidth / 2;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth / 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if ((checkedBox || []).includes(index)) {
      ctx.beginPath();
      ctx.moveTo(x + width + 1, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y);

      if (pageIndex === 0) {
        ctx.fillStyle = "rgba(0,0,255,0.3)";
        ctx.fill();
      } else if (pageIndex === 1) {
        if ((startHoldBox || []).includes(index)) {
          ctx.fillStyle = "rgba(255,255,100,0.4)";
          ctx.fill();
        }
      } else if (pageIndex === 2) {
        if ((startHoldBox || []).includes(index)) {
          ctx.fillStyle = "rgba(255,255,100,0.4)";
          ctx.fill();
        }
        if ((topHoldBox || []).includes(index)) {
          ctx.fillStyle = "rgba(255,55,44,0.1)";
          ctx.fill();
        }
      }
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x + width + 1, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y);
      ctx.stroke();
    }
  };
  //render Box
  const renderBox = (box, index, ctx2) => {
    if (!box || typeof box === "undefined") return null;
    let color = options.colors.unselected;

    if (pageIndex === 0) {
      if ((checkedBox || []).includes(index)) {
        color = options.colors.selected;
      } else {
        color = options.colors.unselected;
      }
    } else if (pageIndex === 1) {
      if ((startHoldBox || []).includes(index)) {
        color = options.colors.startEnd;
      } else {
        color = options.colors.selected;
      }
    } else if (pageIndex === 2) {
      if ((topHoldBox || []).includes(index)) {
        color = options.colors.tophold;
      } else if ((startHoldBox || []).includes(index)) {
        color = options.colors.startEnd;
      } else {
        color = options.colors.selected;
      }
    } else {
      console.log("page over");
    }
    const lineWidth = 1;
    drawBox(box, color, lineWidth, index, ctx2);
  };

  //render holdBox
  const renderBoxes = () => {
    drawCanvas.width = newSize.width;
    drawCanvas.height = newSize.height;
    const ctx = canvasRef2.current.getContext("2d");
    if (submitCheck === 1) {
      console.log("submit");
      // const newCheckbox = checkedBox.map((index) => {
      //   return boxes[index];
      // });
      // const newStartbox = startHoldBox.map((index) => {
      //   return boxes[index];
      // });
      // const newTopbox = topHoldBox.map((index) => {
      //   return boxes[index];
      // });
      const newCheckbox = checkedBox
        .map((index) => {
          return boxes[index];
        })
        .map((box) => [box[1], box[0], box[1] + box[3], box[0] + box[2]]);
      const newStartbox = startHoldBox
        .map((index) => {
          return boxes[index];
        })
        .map((box) => [box[1], box[0], box[1] + box[3], box[0] + box[2]]);
      const newTopbox = topHoldBox
        .map((index) => {
          return boxes[index];
        })
        .map((box) => [box[1], box[0], box[1] + box[3], box[0] + box[2]]);
      setResult({
        start: newStartbox,
        top: newTopbox,
        holds: newCheckbox,
        id: imgId,
      });
    }

    if (pageIndex === 0) {
      if (startHoldBox.length !== 0) {
        setStartHoldBox([]);
      }
      boxes
        .map((box, index) => {
          return { box, index };
        })
        .forEach((box) => {
          renderBox(box.box, box.index, ctx);
        });
    } else if (pageIndex === 1) {
      if (topHoldBox.length !== 0) {
        setTopHoldBox([]);
      }
      if (checkedBox.length === 0) {
        setpageIndex(0);
        alert("select hold box!");
      }
      if (startHoldBox.length > 2) {
        setpageIndex(1);
        alert("start hold는 2개 이하로 선택!");
        startHoldBox.pop();
      }
      boxes
        .map((box, index) => {
          return { box, index };
        })
        .filter((box) => (checkedBox || []).includes(box.index))
        .forEach((box) => {
          renderBox(box.box, box.index, ctx);
        });
    }
    if (pageIndex === 2) {
      if (startHoldBox.length === 0) {
        alert("Start Hold가 선택되지 않았습니다.");
        setpageIndex(1);
      }
      if (topHoldBox.length > 1) {
        setpageIndex(2);
        alert("top hold는 1개 선택!");
        topHoldBox.pop();
      }
      boxes
        .map((box, index) => {
          return { box, index };
        })
        .filter((box) => (checkedBox || []).includes(box.index))
        .forEach((box) => {
          renderBox(box.box, box.index, ctx);
        });
    }
  };

  const onCanvasClick = (e) => {
    const r = drawCanvas.getBoundingClientRect();
    const scaleX = drawCanvas.width / r.width;
    const scaleY = drawCanvas.height / r.height;
    const x = (e.clientX - r.left) * scaleX;
    const y = (e.clientY - r.top) * scaleY;

    const selectedBox = { index: -1, dimensions: null };

    if (boxes && boxes.length > 0) {
      boxes.forEach((box, index) => {
        if (!box || typeof box === "undefined") return null;

        const coord = box.coord ? box.coord : box;

        let [bx, by, bw, bh] = [0, 0, 0, 0];

        if (
          typeof coord.xmin !== "undefined" &&
          typeof coord.xmax !== "undefined" &&
          typeof coord.ymin !== "undefined" &&
          typeof coord.ymax !== "undefined"
        ) {
          // coord is an object containing xmin, xmax, ymin, ymax attributes
          // width is absolute value of (xmax - xmin)
          // height is absolute value of (ymax - ymin)
          // absolute value takes care of various possible referentials:
          //   - sometimes 0,0 is top-left corner
          //   - sometimes 0,0 is bottom-left corner
          [bx, by, bw, bh] = [
            Math.min(coord.xmin, coord.xmax),
            Math.min(coord.ymin, coord.ymax),
            Math.max(coord.xmin, coord.xmax) - Math.min(coord.xmin, coord.xmax),
            Math.max(coord.ymin, coord.ymax) - Math.min(coord.ymin, coord.ymax),
          ];
        } else {
          // coord is an array containing [x, y, width, height] values
          [bx, by, bw, bh] = coord;
        }

        if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
          // The mouse honestly hits the rect
          const insideBox =
            !selectedBox.dimensions ||
            (bx >= selectedBox.dimensions[0] &&
              bx <= selectedBox.dimensions[0] + selectedBox.dimensions[2] &&
              by >= selectedBox.dimensions[1] &&
              by <= selectedBox.dimensions[1] + selectedBox.dimensions[3]);

          if (insideBox) {
            selectedBox.index = index;
            selectedBox.dimensions = box;
            if (pageIndex === 0) {
              if (checkedBox.includes(index)) {
                setCheckedBox(checkedBox.filter((num) => num !== index));
                //   this.props.onSelected(-1);
              } else {
                //   this.props.onSelected(selectedBox.index);
                setCheckedBox(checkedBox.concat(selectedBox.index));
              }
              console.log(checkedBox);
            } else if (pageIndex === 1) {
              if (checkedBox.includes(index) && startHoldBox.includes(index)) {
                setStartHoldBox(startHoldBox.filter((num) => num != index));
              } else if (
                (checkedBox || []).includes(index) &&
                !(startHoldBox || []).includes(index)
              ) {
                setStartHoldBox(startHoldBox.concat(index));
              }
              console.log(startHoldBox);
            } else if (pageIndex === 2) {
              const selectable = checkedBox.filter(
                (x) => !(startHoldBox || []).includes(x)
              );
              if (
                selectable.includes(index) &&
                (topHoldBox || []).includes(index)
              ) {
                setTopHoldBox(topHoldBox.filter((num) => num != index));
              } else if (
                selectable.includes(index) &&
                !(topHoldBox || []).includes(index)
              ) {
                setTopHoldBox(topHoldBox.concat(index));
              }
              console.log(topHoldBox);
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!canvasRef) return;
    if (!imageLoad) {
      const ctx = canvasRef.current.getContext("2d");
      const image = new Image();
      image.src = sample;
      image.onload = function () {
        console.log("onload");
        //입력 파일의 크기를 알아냄
        const { width, height } = newSize;
        console.log(image);
        // 캔버스 크기를 결정
        outCanvas.width = width;
        outCanvas.height = height;

        console.log("width: ", width, "height: ", height);
        ctx.drawImage(image, 0, 0, 720, 720);
        setImageLoad(true);
      };
    } else {
      renderBoxes();
    }
  }, [fetch, renderBoxes, onCanvasClick]);

  return (
    <div>
      <div
        className="canvasArea"
        style={{ height: newSize.height, width: newSize.width }}
      >
        <canvas id="canvas" ref={canvasRef} />
        <canvas id="canvas2" ref={canvasRef2} onClick={onCanvasClick} />
      </div>
    </div>
  );
};

export default ViewArea;
