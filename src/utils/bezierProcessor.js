export const processBezier = async (imageBlob) => {
  const formData = new FormData();
  formData.append("image", imageBlob, "image.png");
  const response = await fetch("https://correct-ursuline-dennischang-0f71bc66.koyeb.app/process_image", {
    method: "POST",
    body: formData,
  });
  return response.json();
};
