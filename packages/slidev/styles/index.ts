import { register } from "@public-ui/core";
import { BMF, BZST, DESY, ITZBund, MAPZ } from "@public-ui/themes";
import "./base.css";

register(
  [BMF, BZST, DESY,  ITZBund, MAPZ],
  () => {
    return new Promise((resolve) => resolve());
  },
  {
    theme: {
      detect: "auto",
    },
  }
)
  .then(() => {
    document.body.dataset.theme = "bmf";
  })
  .catch(() => console.warn);
