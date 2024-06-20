const path = require('path');

exports.uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, '../uploads/', file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error('Error while moving file:', err);
      return res.status(500).send(err);
    }

    req.session.filePath = uploadPath;
    res.send('File uploaded successfully.');
  });
};
