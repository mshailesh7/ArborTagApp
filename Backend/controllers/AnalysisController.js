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
            res.json({ imageUrl: `http://192.168.0.104:3000/uploads/Tree_height.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};
exports.averageWidth = async (req, res) => {
    const scriptName = 'average_width.py';
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
        const imagePath = path.join(__dirname, '../uploads/Tree_width.png');
        if (code === 0 && fs.existsSync(imagePath)) {
            res.json({ imageUrl: `http://192.168.0.104:3000/uploads/Tree_width.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};
exports.diversityMap = async (req, res) => {
    const scriptName = 'diversity_map.py';
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
        const imagePath = path.join(__dirname, '../uploads/diversity_map.png');
        if (code === 0 && fs.existsSync(imagePath)) {
            res.json({ imageUrl: `http://192.168.0.104:3000/uploads/diversity_map.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};
exports.pieDistribution = async (req, res) => {
    const scriptName = 'pie_distribution.py';
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
        const imagePath = path.join(__dirname, '../uploads/pie_distribution.png');
        if (code === 0 && fs.existsSync(imagePath)) {
            res.json({ imageUrl: `http://192.168.0.104:3000/uploads/pie_distribution.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};
exports.heatMap = async (req, res) => {
    const scriptName = 'heatmap_carbonseq.py';
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
        const imagePath = path.join(__dirname, '../uploads/heatmap.png');
        if (code === 0 && fs.existsSync(imagePath)) {
            res.json({ imageUrl: `http://192.168.0.104:3000/uploads/heatmap.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};
exports.summaryTree = async (req, res) => {
    const scriptName = 'summary_tree.py';
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
        const imagePath = path.join(__dirname, '../uploads/summary_tree.png');
        if (code === 0 && fs.existsSync(imagePath)) {
            res.json({ imageUrl: `http://192.168.0.104:3000/uploads/summary_tree.png` });
        } else {
            res.status(500).send(`Script executed with code ${code}. Output:\n${output}`);
        }
    });
};