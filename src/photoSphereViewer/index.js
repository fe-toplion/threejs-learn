import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

new Viewer({
  container: document.querySelector("#viewer"),
  panorama: "../static/102.jpg",
  size: {
    width: "100vw",
    height: "80vh",
  },
});
