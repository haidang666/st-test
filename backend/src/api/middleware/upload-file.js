const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the directory for uploads
const uploadDir = path.join(__dirname, '../../../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.csv');
  }
});

// Filter for CSV file
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only CSV files.", false);
  }
};

const upload = multer({ storage: storage, fileFilter: csvFilter });

module.exports = upload;
