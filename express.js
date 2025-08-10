import express from 'express';
const __dirname = import.meta.dirname;

const app = express();
app.use(express.static('public'));

// page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});

// User form page route
app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + '/pages/user.html');
});

// Student form page route
app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/studentForm.html');
});

// Admin form page route
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/adminForm.html');
});

// API Routes 


app.get('/getUser', (req, res) =>{
    const response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    };
    console.log("User Data: ", response);
    res.end(`Received User Data: ${JSON.stringify(response)}`);
});


app.get('/getStudent', (req, res) =>{
    const response = {
        studentID: req.query.studentID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section,
    };
    console.log("Student Data: ", response);
    res.end(`Received Student Data: ${JSON.stringify(response)}`);
});


app.get('/getAdmin', (req, res) =>{
    const response = {
        adminID: req.query.adminID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department,
    };
    console.log("Admin Data: ", response);
    res.end(`Received Admin Data: ${JSON.stringify(response)}`);
});

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});