import fs from "fs";
import path from "path";
import { folderPath } from "../../../globalVars.mjs";

export default async function folderLoader() {
  try {
    const fileNames = fs.readdirSync(folderPath);
    const textFileNames = fileNames.filter((fileName) =>
      fileName.endsWith(".txt")
    );
    const filePaths = textFileNames.map((fileName) =>
      path.join(folderPath, fileName).replace(/\\/g, "/")
    );
    return { filePaths, textFileNames };
  } catch (error) {
    console.error(
      "Error initializing Chroma client or processing files:",
      error
    );
  }
}
