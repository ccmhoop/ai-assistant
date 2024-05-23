import { sentenceSplitter } from "./textSplitters/sentenceSplitter.mjs";
// add .txt files to documents folder backend/chromadb/documents
const maxSentences = 10;

sentenceSplitter(maxSentences);