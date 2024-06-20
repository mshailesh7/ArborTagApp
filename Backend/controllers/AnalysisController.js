const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.averageHeight = async (req, res) => {
    const scriptName = 'average_height.py';
    const filePath = req.session.filePath;

    if (!filePath || !fs.existsSync(filePath)) {
        return res.status(400).send('No file uploaded or file does not exist');
    }

    const pythonProcess = spawn('python', [path.join(__dirname, '../../pyscripts', scriptName), filePath]);

    let output = "";
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        const imagePath = path.join(__dirname, '../uploads/Tree_height.png');
        if (code === 0 && fs.existsSync(imagePath)) {
            res.json({ imageUrl: `http://192.168.0.165:3000/uploads/Tree_height.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};
