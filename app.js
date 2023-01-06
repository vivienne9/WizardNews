const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank1")
const app = express();

app.use(morgan('dev'))

app.get("/", (req, res) => {

  const posts = postBank.list();

  const html = `<!DOCTYPE html>
    <html>
      <head>
       <title>test</title>
       </head>
       <body>
        <ul>
        </ul>
        </body>
        </html>

  
  
  `



const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});