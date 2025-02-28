import React, { useState, useEffect, useRef } from "react";
import "./camera_capture.css";
import { Button, CircularProgress } from "@mui/material";

// Add missing imports:
import { processBackgroundRemoval } from "../utils/bgRemoval";
import { processBezier } from "../utils/bezierProcessor";

// Import the helper functions from our new modules
import { startCamera, stopCamera, captureFrame } from "./captureUtils";
import { processCapturedImage } from "./imageProcessor";
import { displayDesmos } from "./desmosUtils";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // local state for camera capture and processing
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [BezierCurves, setBezierCurves] = useState(null);

  /* ---------- Camera Stream Management ---------- */
  useEffect(() => {
    // Open camera if needed
    if (isCameraOpen) {
      startCamera(videoRef);
    } else {
      stopCamera(videoRef);
    }
    // Cleanup on unmount or when camera is closed
    return () => {
      stopCamera(videoRef);
    };
  }, [isCameraOpen]);

  /* ---------- Capture Frame When Triggered ---------- */
  useEffect(() => {
    if (captured) {
      captureFrame(videoRef, canvasRef);
    }
  }, [captured]);

  /* ---------- Process Captured Image ---------- */
  const processImage = () => {
    setIsProcessing(true);
    // processCapturedImage returns a promise with {bgUrl, result}
    processCapturedImage(canvasRef, processBackgroundRemoval, processBezier)
      .then(({ bgUrl, result }) => {
        setProcessedImage(bgUrl);
        setIsProcessing(false);
        setCaptured(false);
        // Save extracted Bézier curves to state
        setBezierCurves(result);
      })
      .catch((error) => {
        console.error(error);
        setIsProcessing(false);
      });
  };

  /* ---------- Display Desmos Graph When Bézier Data is Ready ---------- */
  useEffect(() => {
    if (BezierCurves === null) return;
    console.log("BezierCurves:", BezierCurves);

    // (Optional) Draw curves on canvas for debugging
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      BezierCurves.forEach((curve, i) => {
        console.log(`Drawing curve ${i}:`, curve);
        ctx.beginPath();
        ctx.moveTo(curve[0][0], curve[0][1]);
        ctx.bezierCurveTo(
          curve[1][0], curve[1][1],
          curve[2][0], curve[2][1],
          curve[3][0], curve[3][1]
        );
        ctx.stroke();
      });
    }
    // Display Desmos using the extracted expressions
    // If your data structure holds the expressions directly or in a .result property,
    // adjust accordingly – here we assume BezierCurves is already an array of LaTeX strings.
    displayDesmos(BezierCurves);
  }, [BezierCurves]);

  /* ---------- UI Event Handlers ---------- */
  const handleCaptureClick = () => {
    if (captured) {
      // Resume camera if already captured.
      setCaptured(false);
      setIsCameraOpen(true);
    } else {
      // Capture frame and then turn off camera.
      setCaptured(true);
      setTimeout(() => setIsCameraOpen(false), 0);
    }
  };

  /* ---------- Render Component ---------- */
  return (
    <div className="camera_capture">
      <div className="canva-wrapper" style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          style={{
            position: "relative",
            zIndex: 2,
            display: isCameraOpen && !captured ? "block" : "none"
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "relative",
            zIndex: 2,
            display: captured ? "block" : "none"
          }}
        />
        {processedImage && (
          <img
            src={processedImage}
            alt="Processed"
            style={{ position: "relative", zIndex: 3 }}
          />
        )}
        {isProcessing && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.7)",
              zIndex: 3
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "1em"
        }}
      >
        {(isCameraOpen || captured) && (
          <Button onClick={handleCaptureClick}>
            {captured ? "Resume" : "Capture"}
          </Button>
        )}
        <Button onClick={() => setIsCameraOpen((prev) => !prev)}>
          {isCameraOpen ? "Close camera" : "Open camera"}
        </Button>
        {captured && (
          <Button variant="contained" onClick={processImage}>
            Process this Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
