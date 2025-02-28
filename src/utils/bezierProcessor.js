export const processBezier = async (imageBlob) => {
  const formData = new FormData();
  formData.append("image", imageBlob, "image.png");
  const response = await fetch("   https://rntma-2001-f90-48a0-d5-89cb-de15-93b6-2306.a.free.pinggy.link/process_image", {
    method: "POST",
    body: formData,
  });
  return response.json();
};
