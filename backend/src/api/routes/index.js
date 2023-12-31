const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload-file');
const exampleController = require('../controllers');

router.get('/', exampleController.getExample);

router.post('/upload-csv', upload.single('file'), exampleController.uploadFile);

router.get('/data', exampleController.getPaginatedList)

module.exports = router;