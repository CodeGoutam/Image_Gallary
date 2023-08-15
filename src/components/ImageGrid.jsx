import React, { useState, useEffect } from "react";
import Image from "./Image";

const ImageGrid = () => {
  const [imageCount, setImageCount] = useState(30);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [shouldShowPreview, setShouldShowPreview] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const onImageClick = (serial) => {
    setShouldShowPreview(true);
    setPreviewIndex(serial);
  };

  document.addEventListener("scroll", () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= scrollableHeight) {
      let newCount = imageCount + 30;
      setImageCount(newCount);
    }
  });

  // Reference https://stackoverflow.com/a/70950378
  // Modified by Hemant Gautam (me)
  function downloadImage(url, name) {
    fetch(url, { mode: "no-cors" })
      .then((resp) => console.log(resp))
      .then((blob) => {
        if (!blob) {
          alert("No data to download. Might be blocked by CORS Policy.");
          return;
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      {shouldShowPreview && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
            background: "red",
            zIndex: 22,
            background: "#000000EE",
          }}
        >
          {
            <img
              onLoad={() => setIsImageLoading(false)}
              src={`https://via.placeholder.com/2000x2000?text=${previewIndex}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "40%",
                aspectRatio: "1/1",
                display: isImageLoading ? "none" : "block",
              }}
            />
          }
          {isImageLoading && (
            <h3
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: "white",
                zIndex: "99",
              }}
            >
              Loading...
            </h3>
          )}
          //to download
          <button
            style={{}}
            onClick={() =>
              downloadImage(
                `http://via.placeholder.com/3900x3900?text=${previewIndex}`,
                "name"
              )
            }
          >
            Download
          </button>
          //left button
          <button
            onClick={() => {
              if (previewIndex > 1) {
                const newPreviewIndex = previewIndex - 1;
                setPreviewIndex(newPreviewIndex);
                setIsImageLoading(true);
              }
            }}
            style={{ position: "absolute", top: "50%", left: "10px" }}
          >
            ⬅️

          </button>
          <button
            onClick={() => {
              if (previewIndex < imageCount) {
                const newPreviewIndex = previewIndex + 1;
                setPreviewIndex(newPreviewIndex);
                setIsImageLoading(true);
              }
            }}
            style={{ position: "absolute", top: "50%", right: "10px" }}
          >
            Right
          </button>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gridColumnGap: "1rem",
          margin: "1rem",
          gridRowGap: "1rem",
        }}
      >
        {[...Array(imageCount)].map((element, index) => {
          return (
            <Image
              key={index}
              serial={index + 1}
              onImageClickListener={() => onImageClick(index + 1)}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageGrid;
