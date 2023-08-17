import multer from "multer";

const storage = multer.memoryStorage();

const uploadMiddlware = multer({ storage }).single("file");

export default uploadMiddlware;

/* 

SHOULD BE USED IN BEFORE CONTROLLER FUNCTION

This code sets up a middleware function using "multer" to 
handle file uploads. It uses "memoryStorage" to store the uploaded file 
in memory as a buffer, and it only handles a single file with the 
field name "file". The resulting middleware function attaches the uploaded file to the 
request object as request.file.
*/
