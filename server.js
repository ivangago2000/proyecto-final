var express = require("express"),
  bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());


app.use("/profesores", require("./routes/profesores"));
app.use("/alumnos", require("./routes/alumnos"));
app.use("/cursos", require("./routes/cursos"));
app.use("/gestion", require("./routes/gestion"));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);