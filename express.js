import express from 'express';
import path from 'path';

const __dirname = import.meta.dirname;
const app = express();
app.use(express.static('public'));

// ---- PAGE ROUTES (To show the HTML files) ----
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});
app.get('/home.html', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});
app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + '/pages/user.html');
});
app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/studentForm.html');
});
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/adminForm.html');
});


// ---- API ROUTES (To handle form submissions) ----

// This function creates the styled success page
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

// Handles the User Form submission
app.get('/getUser', (req, res) => {
    const response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    };
    console.log("User Data: ", response);
    const htmlResponse = createSuccessPage('User Data Received!', response);
    res.send(htmlResponse);
});

// Handles the Student Form submission
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

// Handles the Admin Form submission
app.get('/getAdmin', (req, res) => {
    const response = {
        adminID: req.query.adminID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department,
    };
    console.log("Admin Data: ", response);
    const htmlResponse = createSuccessPage('Admin Data Received!', response);
    res.send(htmlResponse);
});

// ---- START THE SERVER ----
const server = app.listen(5000, () => {
    const host = 'localhost'; // Hardcoding for clarity
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});