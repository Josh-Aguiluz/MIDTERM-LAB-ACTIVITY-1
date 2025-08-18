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
app.use(express.static('public')); // Serves static files from the 'public' directory

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // The 'uploads' folder must exist in your project root
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

// ---- PAGE ROUTES (To show the HTML files) ----

// Main entry point for the application, serves the home page
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


const createSuccessPage = (title, data) => {
    let dataHtml = '';
    for (const key in data) {
        dataHtml += `<p><strong>${key}:</strong> ${data[key]}</p>`;
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
    // Multer populates req.body with form fields and req.file with file info
    const response = {
        adminID: req.body.adminID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        file: req.file.originalname, // Access the uploaded file name
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