const express = require('express');
const cors = require('cors');
const app = express();

// Allow all origins; you can restrict this by passing an options object.
app.use(cors());

// ...existing endpoints...
app.post('/process_image', (req, res) => {
  // Process the image and respond
});

app.listen(5000, () => console.log('Server running on port 5000'));
