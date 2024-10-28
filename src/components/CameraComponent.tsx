import React, { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import { Box } from "@mui/material";

interface Props {
  onDetectEmotion: (emotion: string) => void;
}

const CameraComponent: React.FC<Props> = ({ onDetectEmotion }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const previousEmotionRef = useRef<string>("");

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(
          "/models/tiny_face_detector"
        );
        await faceapi.nets.faceExpressionNet.loadFromUri(
          "/models/face_expression"
        );
        await faceapi.nets.faceLandmark68Net.loadFromUri(
          "/models/face_landmark_68"
        );
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const handleVideoMetadata = () => {
      if (videoRef.current && canvasRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
    };

    loadModels();
    startVideo();
    videoRef.current?.addEventListener("loadedmetadata", handleVideoMetadata);

    return () => {
      videoRef.current?.removeEventListener(
        "loadedmetadata",
        handleVideoMetadata
      );
    };
  }, []);

  const detectEmotion = useCallback(async () => {
    if (videoRef.current && canvasRef.current && modelsLoaded) {
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detection) {
        const resizedDetections = faceapi.resizeResults(detection, displaySize);
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, displaySize.width, displaySize.height);

        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        const expressions: faceapi.FaceExpressions = detection.expressions;
        const primaryEmotion = (
          Object.keys(expressions) as Array<keyof typeof expressions>
        ).reduce((a, b) => (expressions[a] > expressions[b] ? a : b));

        // Chỉ cập nhật cảm xúc nếu có sự thay đổi
        if (primaryEmotion !== previousEmotionRef.current) {
          previousEmotionRef.current = primaryEmotion;
          console.log("Cảm xúc chính hiện tại là", primaryEmotion);
          onDetectEmotion(primaryEmotion);
        }
      }
    }
  }, [modelsLoaded, onDetectEmotion]);

  useEffect(() => {
    if (modelsLoaded) {
      const intervalId = setInterval(detectEmotion, 1000);
      return () => clearInterval(intervalId);
    }
  }, [modelsLoaded, detectEmotion]);

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        muted
        width="100%"
        height="auto"
        sx={{
          borderRadius: "8px",
          boxShadow: 2,
          zIndex: 1,
        }}
      />
      <Box
        component="canvas"
        ref={canvasRef}
        className="canvas-element"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default CameraComponent;
