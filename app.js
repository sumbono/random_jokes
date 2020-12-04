import { fetchJokes } from "./fetcher.js";
import express from 'express';
import axios from 'axios';
import fs from 'fs';

const fetching_jokes = fetchJokes();
const app = express();
const port = 3000;
var jokes = [];
const url = 'http://api.icndb.com/jokes/random/';

function axiosTest(url) {
    return axios.get(url).then(response => response.data.value.joke)
}

app.get('/', (req, res) => {
    fs.readFile("jokes.json", function(err, data) {  
        if (err) throw err; 
        const users = JSON.parse(data);
        console.log(users); // Print users
        res.send(users);
    });
});

app.listen(port, () => console.log('Listening on port: ' + port) )