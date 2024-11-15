const express = require("express");
const router = require("./router");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use("/api", router);
app.use(express.static("upload"));

app.listen(3000, () => {
    console.log("3000端口正在监听");
});
