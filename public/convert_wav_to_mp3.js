import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const encodeMp3ToWebm = async (inputFilePath, outputFilePath) => {
  await execFileAsync("ffmpeg", [
    "-y",
    "-i",
    inputFilePath,
    "-c:a",
    "libopus",
    "-b:a",
    "128k",
    outputFilePath,
  ]);
};

const scanAndConvertMp3Files = async () => {
  console.log("Scanning for .mp3 files...");
  const files = await fs.readdir(".");
  const mp3Files = files.filter(
    (file) => path.extname(file).toLowerCase() === ".mp3"
  );

  for (const mp3File of mp3Files) {
    const webmFile = mp3File.replace(/\.mp3$/i, ".webm");
    try {
      console.log(`Converting ${mp3File} to ${webmFile}...`);
      await encodeMp3ToWebm(mp3File, webmFile);
      await fs.unlink(mp3File);
      console.log(`Converted ${mp3File} to ${webmFile} and deleted original`);
    } catch (error) {
      console.error(`Failed to convert ${mp3File}:`, error);
    }
  }
};

scanAndConvertMp3Files();
