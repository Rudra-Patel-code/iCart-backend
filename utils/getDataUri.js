import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();

  const extension = path.extname(file.originalname).toString();

  const fileUrl = parser.format(extension, file.buffer);

  return fileUrl;
};

export default getDataUri;
