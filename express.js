// Import necessary modules
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the correct file path for the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the Express application
const app = express();

// Set up middleware to parse request bodies and serve static files
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data from forms
app.use(express.json()); // Parses JSON data
app.use(express.static('public')); 
app.use(express.static('uploads')); 

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

// ---- PAGE ROUTES (To show the HTML files) ----


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

// Other routes for serving HTML pages
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/userPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'user.html'));
});

app.get('/studentForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'studentForm.html'));
});

app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'adminForm.html'));
});

app.get('/uploadForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploadForm.html'));
});


// ---- API ROUTES (To handle form submissions) ----

// response page
const createSuccessPage = (title, data) => {
    let dataHtml = '';
    let uploadedFileImage = '';

    for (const key in data) {
        if (key === 'file' && data[key] !== 'No file uploaded') {
 
            if (data[key].match(/\.(jpeg|jpg|png|gif|avif)$/i)) {
   
                uploadedFileImage = `<div class="uploaded-image-container"><p><strong>Uploaded File:</strong></p><img src="/${data[key]}" alt="Uploaded File" class="small-image"></div>`;
            } else {
                dataHtml += `<p><strong>Uploaded File:</strong> ${data[key]}</p>`;
            }
        } else {
            dataHtml += `<p><strong>${key}:</strong> ${data[key]}</p>`;
        }
    }

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Submission Successful</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>${title}</h1>
                <div style="text-align: left; display: inline-block;">
                    ${dataHtml}
                </div>
                ${uploadedFileImage}
                <div class="links">
                    <a href="/">Go Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Handles the User Form submission (GET request)
app.get('/getUser', (req, res) => {
    const response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    };
    console.log("User Data: ", response);
    const htmlResponse = createSuccessPage('User Data Received!', response);
    res.send(htmlResponse);
});

// Handles the Student Form submission (GET request)
app.get('/getStudent', (req, res) => {
    const response = {
        studentID: req.query.studentID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section,
    };
    console.log("Student Data: ", response);
    const htmlResponse = createSuccessPage('Student Data Received!', response);
    res.send(htmlResponse);
});


app.post('/postAdmin', upload, (req, res) => {
    const response = {
        adminID: req.body.adminID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        file: req.file ? req.file.originalname : 'No file uploaded',
    };
    console.log("Admin Data: ", response);
    const htmlResponse = createSuccessPage('Admin Data Received!', response);
    res.send(htmlResponse);
});

// ---- START THE SERVER ----
const server = app.listen(5000, () => {
    const host = 'localhost';
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});