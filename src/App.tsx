import React, { useState } from "react";
import CameraComponent from "../src/components/CameraComponent";
import AvatarComponent from "../src/components/AvatarComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.scss";

const App: React.FC = () => {
  const [currentEmotion, setCurrentEmotion] = useState<string>("neutral");

  const handleDetectEmotion = (emotion: string) => {
    setCurrentEmotion(emotion);
  };

  return (
    <Box className="app-container">
      {/* Tiêu đề */}
      <Typography className="title" component="h1" gutterBottom>
        AVATAR THEO CẢM XÚC
      </Typography>

      {/* Mô tả */}
      <Typography className="description" component="p" color="textSecondary">
        Ứng dụng AI sử dụng model nhận diện cảm xúc của face-api.js
      </Typography>

      {/* Container chứa CameraComponent và AvatarComponent */}
      <Box className="camera-avatar-container">
        {/* Phần CameraComponent */}
        <Box className="camera-box">
          <CameraComponent onDetectEmotion={handleDetectEmotion} />
        </Box>

        {/* Phần AvatarComponent */}
        <Box className="avatar-box">
          <AvatarComponent emotion={currentEmotion} />
        </Box>
      </Box>

      {/* Thông tin ở cuối trang */}
      <Typography className="footer" component="p" color="textSecondary" mt={4}>
        Bài tập về nhà thực hiện bởi Hoàng Kiên Quyết VB2 CNTT03 K68
      </Typography>
    </Box>
  );
};

export default App;
