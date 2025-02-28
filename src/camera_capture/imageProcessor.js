
/**
 * Processes the captured image:
 * (1) Converts a canvas snapshot to Blob,
 * (2) Calls processBackgroundRemoval and fetches a Blob from the returned URL,
 * (3) Calls processBezier with the background-removed Blob.
 *
 * Returns a Promise that resolves with an object containing the background image URL and Bézier result.
 */
export async function processCapturedImage(canvasRef, processBackgroundRemoval, processBezier) {
  return new Promise((resolve, reject) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      reject("Canvas not found");
      return;
    }
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject("Failed to create Blob");
        return;
      }
      try {
        // Remove the background and get its URL
        const bgUrl = await processBackgroundRemoval(blob);
        // Fetch the background removed image and convert to Blob
        const res = await fetch(bgUrl);
        const bgBlob = await res.blob();
        const response = await processBezier(bgBlob);
        resolve({ bgUrl, result: response.result });
      } catch (e) {
        reject(e);
      }
    }, "image/png");
  });
}
