import { fetchJokes } from "./libs.js";
import express from 'express';
import axios from 'axios';
import fs from 'fs';

const fetching_jokes = fetchJokes();
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    fs.readFile("jokes.json", function(err, data) {  
        if (err) throw err; 
        const jokes = JSON.parse(data);
        const chunked_jokes = {};
        var count = 0;
        for (var x in jokes) {
            chunked_jokes[x] = jokes[x];
            count += 1;
            if (count == 5) {break;}
        }
        console.log(chunked_jokes);
        res.send(chunked_jokes);
    });
});

app.get('/api/refresh_jokes', (req, res) => {
    fetchJokes();
    fs.readFile("jokes.json", function(err, data) {  
        if (err) throw err; 
        const jokes = JSON.parse(data);
        const chunked_jokes = {};
        var count = 0;
        for (var x in jokes) {
            chunked_jokes[x] = jokes[x];
            count += 1;
            if (count == 10) {break;}
        }
        // console.log(chunked_jokes);
        res.send(chunked_jokes);
    });
});

app.delete('/api/delete_all', (req, res) => {
    const json_jokes = {};
    fs.writeFile("jokes.json", JSON.stringify(json_jokes, null, "\t"), err => { 
        if (err) throw err;
        console.log("Done removing all jokes"); 
    });
    res.send("All jokes removed.")
});

app.listen(port, () => console.log('Listening on port: ' + port) )