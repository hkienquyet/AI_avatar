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
    <Box
      className="app-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
    >
      {/* Tiêu đề */}
      <Typography variant="h4" component="h1" gutterBottom>
        AVATAR THEO CẢM XÚC
      </Typography>

      {/* Mô tả */}
      <Typography variant="subtitle1" component="p" color="textSecondary">
        Ứng dụng AI sử dụng model nhận diện cảm xúc của face-api.js
      </Typography>

      {/* Container chứa CameraComponent và AvatarComponent */}
      <Box display="flex" width="100%" height="70vh" mt={4} gap={2}>
        {/* Phần CameraComponent */}
        <Box
          width="50%"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border={1}
          borderColor="green"
          borderRadius={1}
          p={2}
        >
          <CameraComponent onDetectEmotion={handleDetectEmotion} />
        </Box>

        {/* Phần AvatarComponent */}
        <Box
          width="50%"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border={1}
          borderColor="blue"
          borderRadius={1}
          p={2}
        >
          <AvatarComponent emotion={currentEmotion} />
        </Box>
      </Box>

      {/* Thông tin ở cuối trang */}
      <Typography variant="caption" component="p" color="textSecondary" mt={4}>
        Bài tập về nhà thực hiện bởi Hoàng Kiên Quyết VB2 CNTT03 K68
      </Typography>
    </Box>
  );
};

export default App;
