const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));