import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Sample list of image URLs
const imageList = [
  "https://static0.colliderimages.com/wordpress/wp-content/uploads/2023/09/everything-now-netflix-poster.jpg",
  "https://w0.peakpx.com/wallpaper/731/86/HD-wallpaper-jon-snow-got-poster-game-game-of-thrones-jon-snow-of-thrones.jpg",
  "https://static.toiimg.com/thumb/msid-115901762,width-400,resizemode-4/115901762.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8b2ef92655071.5e505bf7132ab.png",
  "https://alternativemovieposters.com/wp-content/uploads/2017/05/chelsea_saul.jpg",
  "https://wallpapercave.com/wp/wp3050967.jpg",
  "https://pbs.twimg.com/media/GR9WRruXQAARXqv?format=jpg&name=4096x4096",
  "https://m.media-amazon.com/images/I/71o1aRN1FJL.jpg",
  "https://boldoutline.in/wp-content/uploads/2018/06/netflix-cover-770x385.jpg",
  "https://streambly.com.au/sites/default/files/article_images/money_heist_5_poster.jpeg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7e9baf113976305.6032bd8ca7b0a.jpg",
  "https://ew.com/thmb/iyNDwCUxLoSUO1R515YPYe2e7Wg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brad-Pitt-F1-Poster-070524-fe9add0efa85450297b5f1d208ca9b79.jpg",
];

export default function ImageGallery() {
  // Use useGSAP hook for animations
  useGSAP(() => {
    gsap.from("#text", { x: -1000, duration: 1.3 });

    gsap.from(".who", {
      y: 1000,
      duration: 0.6,
      scrollTrigger: {
        trigger: "#text-who",
        scroller: "body",
        start: "top 50%",
        end: "top -60%",
      },
    });
  });

  return (
    <div className="max-w-7xl h-screen mx-auto px-4 py-8">
      {/* Header Animation */}
      <div className="">
        <h1 id="text" className="text-[5vh] sm:text-[13vh] italic font-bold text-center mb-8">
          FRAMES
        </h1>
      </div>

      {/* Responsive Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {imageList.map((src, index) => (
          <div
            key={index}
            className="mb-4 break-inside-avoid rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={src}
              alt={`Image ${index}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
