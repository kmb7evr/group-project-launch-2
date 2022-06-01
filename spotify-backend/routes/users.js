var express = require('express');
var router = express.Router();
const db = require("./firebase")

const {getDocs, doc, collection, addDoc, updateDoc} = require("firebase/firestore")
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

router.put("/privacy", async (req, res, next) => {
  const postRef = doc(db, "users", req.body.id);
  await updateDoc(postRef, {
     isPublic: req.body.isPublic
  });
  res.send("Received")
})

router.put("/username", async (req, res, next) => {
  const postRef = doc(db, "users", req.body.id);
  await updateDoc(postRef, {
     username: req.body.username
  });
  res.send("Received")
})

router.put("/firstname", async (req, res, next) => {
  const postRef = doc(db, "users", req.body.id);
  await updateDoc(postRef, {
     firstName: req.body.firstName
  });
  res.send("Received")
})

router.put("/lastname", async (req, res, next) => {
  const postRef = doc(db, "users", req.body.id);
  await updateDoc(postRef, {
     lastName: req.body.lastName
  });
  res.send("Received")
})

router.put("/email", async (req, res, next) => {
  const postRef = doc(db, "users", req.body.id);
  await updateDoc(postRef, {
     email: req.body.email
  });
  res.send("Received")
})

module.exports = router;
