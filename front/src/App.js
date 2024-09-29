import React, { useState } from "react";
import './App.css'; // CSS 파일 적용

function ImageUploader() {
  const [imagePath, setImagePath] = useState("");
  const [maskImagePath, setMaskImagePath] = useState("");
  const [singleImageFile, setSingleImageFile] = useState(null);
  const [hdf5Path, setHdf5Path] = useState("");

  const handleGenerate = () => {
    console.log("Generate clicked");
    console.log("Image Path: ", imagePath);
    console.log("Mask Image Path: ", maskImagePath);
  };

  const handleLoadFile = () => {
    console.log("Load file clicked");
    console.log("Single Image File: ", singleImageFile);
  };

  const handleRetrain = () => {
    console.log("Retrain clicked");
    console.log("HDF5 Path: ", hdf5Path);
  };

  return (
    <div className="container">
      <div className="section">
        <h3>1. It loads the image paths and shows the results.</h3>
        <div className="radio-group">
          <label><input type="radio" name="format" value="jpeg" /> JPEG</label>
          <label><input type="radio" name="format" value="dicom" /> Dicom</label>
        </div>
        <div className="input-group">
          <label>Insert folder name of the result:</label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="Insert image path"
          />
        </div>
        <div className="input-group">
          <label>Insert the path of mask image:</label>
          <input
            type="text"
            value={maskImagePath}
            onChange={(e) => setMaskImagePath(e.target.value)}
            placeholder="Insert mask image path"
          />
        </div>
        <button className="generate-button" onClick={handleGenerate}>Generate</button>
      </div>

      <div className="section">
        <h3>2. It loads the 1 image file and shows the result.</h3>
        <div className="radio-group">
          <label><input type="radio" name="maskOption" value="withoutMask" /> Without mask image</label>
          <label><input type="radio" name="maskOption" value="withMask" /> With mask image</label>
        </div>
        <div className="input-group file-input">
          <label>Select only 1 image file:</label>
          <input
            type="file"
            onChange={(e) => setSingleImageFile(e.target.files[0])}
          />
        </div>
        <button className="load-button" onClick={handleLoadFile}>Load file</button>
      </div>

      <div className="section">
        <h3>3. It loads the HDF5 path and then re-train process begins.</h3>
        <div className="input-group">
          <label>Insert your '.hdf5' file's path:</label>
          <input
            type="text"
            value={hdf5Path}
            onChange={(e) => setHdf5Path(e.target.value)}
            placeholder="Insert .hdf5 path"
          />
        </div>
        <button className="retrain-button" onClick={handleRetrain}>Re-train</button>
      </div>
    </div>
  );
}

export default ImageUploader;
