const express = require("express");
const faker = require("faker");

const app = express();
const port = 5000;

app.use(express.static("build"));

app.get("/sentence", (req, res) => {
    res.send(faker.lorem.sentence());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
