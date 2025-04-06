import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pages/TrangChu/trangChu.scss";

const SlideShowHome = () => {
  const imageList = [
    {
      id: 1,
      src: "/image/hoahoc.jpg",
      alt: "môn hoá",
    },
    { id: 2, src: "/image/tienganh.jpg", alt: "Tiếng anh" },
    { id: 3, src: "/image/hoahoc.jpg", alt: "Mê Kuromi" },
    { id: 4, src: "/image/hoahoc.jpg", alt: "Mê màu xanh" },
    {
      id: 5,
      src: "/image/hoahoc.jpg",
      alt: "Back to school cùng Capybara",
    },
    { id: 6, src: "/image/tienganh.jpg", alt: "Gấu bông cute" },
  ];

  const [index, setIndex] = useState(0);
  const handlePrev = () => {
    setIndex(index === 0 ? imageList.length - 4 : index - 1);
  };
  const handleNext = () => {
    setIndex(index === imageList.length - 4 ? 0 : index + 1);
  };

  return (
    <div className="carousel-container ">
      <button className="text-white carousel-btn left-btn d-flex align-items-center" onClick={handlePrev}>
        &#10094;
      </button>

      <div className="container image-carousel">
        <div className="row image-row">
          {imageList.slice(index, index + 4).map((item) => (
            <div key={item.id} className="col-md-3 col-sm-12">
              <div className="image-item">
                <img src={item.src} alt={item.alt} className="img-fluid" />
                <div className="image-alt">{item.alt}</div>
              </div>
              <div className="text-center fs-5 my-2 fw-medium">{item.alt}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="text-white carousel-btn right-btn" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default SlideShowHome;