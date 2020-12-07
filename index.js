const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'directory here')));

app.get('/', (req, res) => {
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

