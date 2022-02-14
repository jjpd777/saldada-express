// read env vars from .env file
require('dotenv').config();
const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var belvo = require('belvo').default;
const APP_PORT =process.env.PORT || 3001;

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

var client = new belvo(
  'b60f126a-a141-4a25-a4e6-ae38da596290',
  'K2bAhXWx81MJ7Lg5y842ltguJC2Ytr6-ljlKWq1USVQnD8lByYS4YV@UrMA-h7NY',
  'sandbox'
);

const widget = {
  branding: {
    company_icon: "https://dd7tel2830j4w.cloudfront.net/f1644844083872x660583407792153500/saldada-color-icon.svg",
    company_name: "Saldada",
    company_benefit_header: "Faster approvals",
    company_benefit_content: "Using Belvo cuts down on your loan approval time by up to 15 days.",
    opportunity_loss: "It can take up to 20 days to evaluate your request using traditional methods."
      
  }
}

const options = {scopes: 'read_institutions,write_links,read_links', widget: widget};

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/api/', (req, res,)=>{
  return res.json("Testing deployment")
});

app.get('/api/auth', (req, res,)=>{
  console.log("Pinged")
  return client.connect()
  .then(function () {
        client.widgetToken.create(options)
      .then((response) => {
      res.json(response);
        })
      .catch((error) => {
      res.status(500).send({
        message: error.message
      });
    });
})
});



app.listen(APP_PORT, function () {
  console.log('plaid-quickstart server listening on port ' + APP_PORT);
});
