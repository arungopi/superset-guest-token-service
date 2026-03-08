/**
 * REST API server for providing Apache Superset access token
 */

const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
var logger = require('morgan');
let cors = require('cors') // For cross-origin support

let { getGuestToken } = require('./supersetManagement');

const app = express();
app.use(cors());
app.use(logger('combined'));
app.use(express.json()); // for handling application/json
app.use(express.urlencoded({ extended: true })); // for handling application/x-www-form-urlencoded data


app.get('/about', async (req, res) => {
  res.send("Superset guest toker provider service");
});

app.post('/superset/token', async (req, res) => {

 const {dashboardId} = req.body;

 try {
  const guestToken = await getGuestToken(dashboardId);
  return res.json({guestToken});
 } catch (error) {
  return res.status(400).json({ message: 'Failed' });
 }
});

let serverHandle = app.listen(process.env.PORT || 3000, () => {
  console.log(`API server : started on port ${serverHandle.address().port}\nAPI server : waiting for requests`);
});