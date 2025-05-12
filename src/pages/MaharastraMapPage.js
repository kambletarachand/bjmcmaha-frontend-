// MaharashtraMapPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const districtLinks = {
  pune: "/district/pune",
  mumbai: "/district/mumbai",
  nagpur: "/district/nagpur",
  // Add all districts with appropriate paths
};

const MaharashtraMapPage = () => {
  const navigate = useNavigate();

  const handleDistrictClick = (districtId) => {
    const path = districtLinks[districtId.toLowerCase()];
    if (path) navigate(path);
  };

  return (
    <div className="w-full h-auto flex justify-center items-center p-4">
      <object
        type="image/svg+xml" // Change to "image/png" if using PNG
        data="/mapimages/Maharashtra_Divisions_mr.svg" // or .png
        className="w-full max-w-4xl"
        onLoad={(e) => {
          const svgDoc = e.target.contentDocument;
          if (svgDoc) {
            Object.keys(districtLinks).forEach((id) => {
              const district = svgDoc.getElementById(id);
              if (district) {
                district.style.cursor = "pointer";
                district.addEventListener("click", () => handleDistrictClick(id));
              }
            });
          }
        }}
      >
        Your browser does not support embedded images.
      </object>
    </div>
  );
};

export default MaharashtraMapPage;
