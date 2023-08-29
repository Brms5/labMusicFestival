import React from "react";

interface InputBandImage {
  bandImage: string;
}

function BandImage({ bandImage }: InputBandImage) {
  return (
    <div style={{ overflow: "hidden" }}>
      <img
        src={`${bandImage}`}
        alt="band-image"
        style={{ maxWidth: "100%", height: "350px" }}
      />
    </div>
  );
}

export default BandImage;
