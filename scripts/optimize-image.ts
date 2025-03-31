import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, "../public/images/moneyverse_main.png");
const tempPath = path.join(__dirname, "../public/images/temp.png");

sharp(inputPath)
  .resize(800, 800, {
    fit: "inside",
    withoutEnlargement: true,
  })
  .png({ quality: 80 })
  .toFile(tempPath)
  .then(() => {
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);
    console.log("이미지 최적화가 완료되었습니다.");
  })
  .catch((err: Error) => {
    console.error("이미지 최적화 중 오류가 발생했습니다:", err);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  });
