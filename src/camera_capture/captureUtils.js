
/**
 * Starts the camera stream and sets the videoRef's source.
 */
export function startCamera(videoRef) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    })
    .catch(console.error);
}

/**
 * Stops the camera stream.
 */
export function stopCamera(videoRef) {
  const videoEl = videoRef.current;
  if (videoEl && videoEl.srcObject) {
    videoEl.srcObject.getTracks().forEach((track) => track.stop());
    videoEl.srcObject = null;
  }
}

/**
 * Captures a frame from the video into the canvas.
 */
export function captureFrame(videoRef, canvasRef) {
  if (!videoRef.current || !canvasRef.current) return;
  const ctx = canvasRef.current.getContext("2d");
  canvasRef.current.width = videoRef.current.videoWidth;
  canvasRef.current.height = videoRef.current.videoHeight;
  ctx.drawImage(videoRef.current, 0, 0);
}
