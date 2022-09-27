const {app} = require('./app');

// Server start
app.listen(8001, () => {
    console.log("Listening on port 8001...");
});