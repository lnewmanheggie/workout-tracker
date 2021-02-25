const express = require('express');
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(logger("dev"));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);



mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    }
);

app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));



