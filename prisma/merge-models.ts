import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// แปลง import.meta.url เป็น __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โฟลเดอร์ที่เก็บ Models
const modelsDir = path.join(__dirname, "models");
const schemaFile = path.join(__dirname, "schema.prisma");

// ส่วนเริ่มต้นของ schema.prisma (ไม่มี Model)
const baseSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
`;

// โหลดไฟล์ Model ทั้งหมด
const models = fs
  .readdirSync(modelsDir)
  .map((file) => fs.readFileSync(path.join(modelsDir, file), "utf8"))
  .join("\n\n");

// รวม baseSchema + Models
const newSchema = `${baseSchema}\n\n${models}`;

// เขียน schema.prisma ใหม่
fs.writeFileSync(schemaFile, newSchema);

console.log("✅ Prisma schema updated!");
