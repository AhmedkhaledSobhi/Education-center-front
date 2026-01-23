import React, { useState } from "react";
import productImage from "../../assets/images/default-product.png";

const ImageWithLoader = ({
  src,
  alt = "image",
  className = "",
  style = {},
  width= 60,
  height= 60,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setError(true);

  const shouldShowRealImage = !!src && !error;

  return (
    <div
      className={`position-relative overflow-hidden ${className}`}
      style={{ width: width ?? "100%", height: height ?? "100%", ...style }}
    >
      <img
        src={productImage}
        alt="fallback"
        className="img-fluid position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover",
          opacity: loaded && shouldShowRealImage ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
        width={width}
        height={height}
      />

      {shouldShowRealImage && (
        <img
          src={src}
          alt={alt ?? "Image For Product"}
          onLoad={handleLoad}
          onError={handleError}
          className="img-fluid position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
