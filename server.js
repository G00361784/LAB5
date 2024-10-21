const express = require('express');
const app = express();//app get express logic
const port = 3000;//
const path = require('path');
app.use((err, req, res, next) => {
    console.error(err.stack);//using error handling
    res.status(500).send('Something went wrong!');//sending code 500 and error response
});
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('welcone to data rep');//displaying welcomne
});

app.get('/hello/:name/:secondName', (req, res) => {//using the url paramaters to handle data
    const name = req.params.name;//pulling out variable to use in the send statement below
    const secondName = req.params.secondName
    res.send(`Hello ${name} ${secondName}`);
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/name', (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});
app.get('/api/movies', (req, res) => {
    const movies = [//array to handle the information
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies:movies });//adding status method to the http response to make sure evryting is ok
});


app.post('/name', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});