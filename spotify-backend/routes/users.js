var express = require('express');
var router = express.Router();
const db = require("./firebase")
const { getDocs, collection, addDoc } = require("firebase/firestore")
var fetch = require('node-fetch');



router.get('/', async (req, res, next) => {
  try {
    console.log(req.query.token)
    const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=10'
    const data = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + req.query.token
      }
    }).catch(err => console.log(err))
      .then(res => res.json())
      .then(data => data)

    res.status(200).send(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})


// router.get()


router.get("/data", async (req, res, next) => {
  const allDocData = []
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => allDocData.push(doc.data()))
  res.json({ result: allDocData })
})

module.exports = router;
