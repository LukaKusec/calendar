const googleApis = require("googleapis")


var express = require('express');
var router = express.Router();

const oauth2client = new googleApis.google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'

)


router.get('/events', async function(req, res, next) {
  const days = parseInt(req.query.days)

  if(isNaN(days)){
    res.status(400).send();
    return;
  }


  oauth2client.setCredentials({access_token: req.access_token})
  const calendar = googleApis.google.calendar({version: 'v3', auth: oauth2client});

  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + days);
  
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    timeMax: maxDate.toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
    
  }, (err, resp) => {
    if (err) {
      if(err.status==401){
        res.status(401).send();
      } else {
        res.status(400).send();
      }
      return;
    }
    
    const events = resp.data.items;

    res.send(events)
  });
  

});


router.post('/events', async function(req, res, next) {
  const { summary, start, end } = req.body

  const startDateTime = new Date(start)
  const endDateTime = new Date(end)

  oauth2client.setCredentials({access_token: req.access_token})
  const calendar = googleApis.google.calendar({version: 'v3', auth: oauth2client});
  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: summary,
      start: {
        dateTime: startDateTime
      },
      end:{
        dateTime: endDateTime
      },
      colorId: '5',
    }
  }).catch((err)=>{
    console.log(err)
    res.status(400).send();
  })

  res.status(201).send(response);
})

router.delete('/events', async function(req, res, next) {
  const { eventId } = req.query
  oauth2client.setCredentials({access_token: req.access_token})
  const calendar = googleApis.google.calendar({version: 'v3', auth: oauth2client});
  calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId
  }).then(response=>{
    res.status(204).send(response);
  }).catch(err=>{
    if(err.status==401)
      res.status(401).send();
    else
      res.status(400).send();
  })

  
})

module.exports = router;