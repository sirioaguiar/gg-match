import express from 'express';

const app = express();

app.get('/groups', (request, response) => {
    return response.json([
        {id:1, name:'group1', game:'cod', host:'tata42'},
        {id:2, name:'group2', game:'lol', host:'manko'},
        {id:3, name:'group3', game:'brawl stars', host:'inimigor'},
        {id:4, name:'group4', game:'cs', host:'gaules'},
        {id:5, name:'group5', game:'fifa', host:'lira'},
    ]);
});

app.listen(3333);