import { removeBackground } from "@imgly/background-removal";

export function processBackgroundRemoval(blob) {
  return removeBackground(blob)
    .then((resultBlob) => URL.createObjectURL(resultBlob));
}
