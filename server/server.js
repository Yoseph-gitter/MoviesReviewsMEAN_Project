const xp = require('express');
const path = require('path');

app = xp();


app.use(xp.static(path.join(__dirname, "./../public/dist/public"))) ;

module.exports = app ;