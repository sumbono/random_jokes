import axios from 'axios';
import fs from 'fs';

var jokes = [];
const url = 'http://api.icndb.com/jokes/random/';

function axiosTest(url) {
    return axios.get(url).then(response => response.data.value.joke)
}

export function fetchJokes() {
    Promise.all([axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url), axiosTest(url)])
        .then(function (results) {
            jokes = [...new Set(results)];
            // console.log(jokes);
            var json_jokes = Object.assign({}, jokes);
            fs.writeFile("jokes.json", JSON.stringify(json_jokes, null, "\t"), err => { 
                if (err) throw err;
                console.log("Done storing jokes"); 
            });
    });
}

export function wordsCount() {
    var readJOKES = JSON.parse(fs.readFileSync('jokes.json','utf-8'));
    var str_words = [];
    var joke_list = [];
    var unique_word_count = {};
    var result = {};

    for (var x in readJOKES) {
        joke_list.push(readJOKES[x]);
        str_words.push(...readJOKES[x].split(' '));
    }
    var unique_words = [...new Set(str_words)];
    var joke_joined = joke_list.join(' ');
    
    for (var elem in unique_words) {
        var rgxp = new RegExp(unique_words[elem], "gi");
        var matched = joke_joined.match(rgxp);
        if (matched) {
            unique_word_count[unique_words[elem]] = matched.length;
        }
    }
    
    result['jokes'] = joke_list;
    result['words'] = unique_word_count;

    return result;  
};

// console.log(wordsCount())