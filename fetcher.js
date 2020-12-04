import axios from 'axios';
import fs from 'fs';

var jokes = [];
const url = 'http://api.icndb.com/jokes/random/';

function axiosTest(url) {
    return axios.get(url).then(response => response.data.value.joke)
}

export function fetchJokes() {
    Promise.all([axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url)])
        .then(function (results) {
            jokes = [...new Set(results)];
            // console.log(jokes);
            var json_jokes = Object.assign({}, jokes);
            fs.writeFile("jokes.json", JSON.stringify(json_jokes, null, "\t"), err => { 
                // Checking for errors
                if (err) throw err;
                console.log("Done storing jokes"); // Success 
            });
    });
}