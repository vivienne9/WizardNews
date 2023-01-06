const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank")
const app = express();

app.use(morgan('dev'))

app.use(express.static(`./public`));

app.get("/", (req, res) => {

const posts = postBank.list();

const HTML = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" type="text/css" href="css/style.css" />
    </head>
    <body>
      <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        ${posts.map(post => `
          <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>`
        ).join('')}
      </div>
    </body>
  </html>`
res.send(HTML);
})

app.get("/posts/:id", (req, res) => {
  
  const id = req.params.id;

  const post = postBank.find(id);

  if (!post.id) {
    // if the post was not found thow a 404 error // 
  res.status(404)

  const htmlError = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Evanesco! Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
  res.send(htmlError)
    
  } else {

  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title> Wizard News </title>
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
      </head>
      <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <p>
              ${post.content}
            </p>
          </div>
        </div>
      </body>
    </html>`;

  res.send(html);
  };
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});