const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const templatePath = path.join(__dirname, 'home', 'index.html');

app.get('/', (req, res) => {
  fs.readFile(templatePath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).send('Error loading template');
    }

    const name = req.query.name || 'Guest';
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const renderedHtml = html
      .replace('{{name}}', name)
      .replace('{{day}}', day);

    res.send(renderedHtml);
  });
});
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.get('/api/joke', (req, res) => {
  const jokes = [
    'Why do developers hate nature? It has too many bugs.',
    'Why did the function break up with the loop? It felt trapped.',
    'How do you comfort a JavaScript bug? You console it.',
    "Don't trust JavaScript programmers. All they do is promises but they never callback."
  ];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  res.json({ joke: randomJoke });
});

app.listen(PORT, () => {
  console.log(`SSR and CSR app running at http://localhost:${PORT}`);
});