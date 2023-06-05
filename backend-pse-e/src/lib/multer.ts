const multer = require("multer");
const path = require("path");

/**
 * HELPER FOR UPLOADING FILES
 */

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 2097152 }, // max size is 2mb
    fileFilter: (req: any, file: any, cb: any) => {
        let ext = path.extname(file.originalname);
        if ((ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png")) {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});