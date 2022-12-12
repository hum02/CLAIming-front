import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import ImageUploader from "react-images-upload";

export default function Upload() {
  const [pictures, setPictures] = useState([]);
  const [file, setFile] = useState("");
  const [image_64, setImage_64] = useState();
  const navigate = useNavigate();

  const onDrop = (picture) => {
    setFile(picture[0]);
    console.log(picture[0]);
  };

  function setFile2Image_64() {
    const reader = new FileReader();
    reader.onload = function () {
      console.log(reader.result);
      navigate("/answer", { state: { image: reader.result } });
    };
    reader.readAsDataURL(file);
  }

  const onImageConfirm = (e) => {
    console.log(file);
    setFile2Image_64();
  };

  return (
    <div className="imageUploader">
      <ImageUploader
        withIcon={true}
        withPreview={true}
        onChange={onDrop}
        label={"click to upload climbing image"}
        imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
        singleImage={true}
        maxFileSize={5242880}
        buttonText="Choose Image"
      />
      <button className="upload-image-button" onClick={() => onImageConfirm()}>
        Submit Image
      </button>
    </div>
  );
}
