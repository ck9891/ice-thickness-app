const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const iceThicknessController = require('./controllers/iceThicknessController');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/register', userController.register);
app.post('/login', userController.login);

app.use(authMiddleware);

app.post('/ice-thickness', iceThicknessController.addIceThicknessData);
app.get('/ice-thickness', iceThicknessController.getIceThicknessData);
app.get('/aggregated-ice-thickness', iceThicknessController.getAggregatedIceThicknessData);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
