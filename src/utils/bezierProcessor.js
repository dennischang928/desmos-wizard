export const processBezier = async (imageBlob) => {
  const formData = new FormData();
  formData.append("image", imageBlob, "image.png");
  const response = await fetch("http://127.0.0.1:5000/process_image", {
    method: "POST",
    body: formData,
  });
  return response.json();
};
