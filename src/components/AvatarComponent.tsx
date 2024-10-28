import React from "react";
import { createAvatar, Options } from "@dicebear/avatars";
import * as adventurer from "@dicebear/avatars-avataaars-sprites"; // Import kiểu style adventurer từ Dicebear
import {
  Eyebrow,
  Eyes,
  Mouth,
} from "@dicebear/avatars-avataaars-sprites/dist/options";
import { Box } from "@mui/material";

interface AvatarComponentProps {
  emotion: string;
}

interface OptionsMotion {
  eyes: Eyes;
  eyebrow: Eyebrow;
  mouth: Mouth;
}

function generateOptionsMotion(emotion: string): OptionsMotion {
  let optionsMotion: OptionsMotion;

  switch (emotion) {
    case "happy":
      optionsMotion = {
        eyes: ["happy"],
        eyebrow: ["raisedExcited"],
        mouth: ["smile"],
      };
      break;
    case "sad":
      optionsMotion = {
        eyes: ["cry"],
        eyebrow: ["sadConcerned"],
        mouth: ["sad"],
      };
      break;
    case "angry":
      optionsMotion = {
        eyes: ["squint"],
        eyebrow: ["angryNatural"],
        mouth: ["serious"],
      };
      break;
    case "surprised":
      optionsMotion = {
        eyes: ["surprised"],
        eyebrow: ["raisedExcitedNatural"],
        mouth: ["concerned"],
      };
      break;
    case "disgusted":
      optionsMotion = {
        eyes: ["xDizzy"],
        eyebrow: ["frownNatural"],
        mouth: ["vomit"],
      };
      break;
    case "fearful":
      optionsMotion = {
        eyes: ["side"],
        eyebrow: ["sadConcernedNatural"],
        mouth: ["scream"],
      };
      break;
    case "neutral":
    default:
      optionsMotion = {
        eyes: ["default"],
        eyebrow: ["defaultNatural"],
        mouth: ["serious"],
      };
      break;
  }

  return optionsMotion;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({ emotion }) => {
  const getAvatarSvg = (emotion: string) => {
    // const seed = emotion; // Dùng emotion làm seed để tạo avatar nhất quán
    let optionsMotion: OptionsMotion = generateOptionsMotion(emotion);
    let options: adventurer.Options & Options = {
      style: "transparent", // Kiểu hiển thị, có thể là "circle" hoặc "transparent"
      mode: "include", // Bao gồm các thuộc tính mong muốn
      top: ["shortFlat"], // Kiểu tóc ngắn cho nam giới
      topChance: 100, // Xác suất xuất hiện tóc
      hatColor: ["black"], // Màu mũ (nếu có đội mũ)
      hairColor: ["black"], // Màu tóc đen, phổ biến ở người châu Á
      accessories: ["prescription01"], // Đeo kính đơn giản (tùy chọn)
      accessoriesChance: 0, // Xác suất đeo phụ kiện, để 50% để xuất hiện ngẫu nhiên
      accessoriesColor: ["black"], // Màu kính
      facialHair: ["light"], // Râu ngắn, nhẹ (thường thấy ở nam giới châu Á)
      facialHairChance: 0, // Tỷ lệ xuất hiện râu
      facialHairColor: ["black"], // Màu râu
      clothes: ["blazerAndSweater"], // Trang phục áo sơ mi
      clothesColor: ["gray02"], // Màu áo
      ...optionsMotion,
      skin: ["light"], // Màu da vàng đặc trưng của người châu Á
      clotheGraphics: ["diamond"], // Hình đồ họa trên áo (tùy chọn)
      width: 1000,
      height: 1000,
    };

    return createAvatar(adventurer, options);
  };

  let svgHTML = getAvatarSvg(emotion);
  svgHTML = svgHTML.replace(
    /height="1000"/,
    'height="1000" style="max-width:100%;max-height:100%;"'
  );

  return (
    <Box
      overflow="hidden"
      height="100%"
      width="100%"
      dangerouslySetInnerHTML={{ __html: svgHTML }}
    ></Box>
  );
};

export default AvatarComponent;
