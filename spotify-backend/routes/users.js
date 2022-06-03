var express = require('express');
var router = express.Router();
const db = require("./firebase")

const { getDocs, doc, collection, addDoc, updateDoc, arrayUnion } = require("firebase/firestore")
var fetch = require('node-fetch');



router.get('/likedSongs', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50'
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
router.get('/likedSongs1', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/tracks?offset=50&limit=50'
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
router.get('/likedSongs2', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/tracks?offset=100&limit=50'
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

router.get('/trackYear', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50&time_range=medium_term'
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


router.get('/trackAll', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50&time_range=long_term'
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

router.get('/trackMonth', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50&time_range=short_term'
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

router.get('/artistYear', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=50&time_range=medium_term'
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


router.get('/artistAll', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=50&time_range=long_term'
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

router.get('/artistMonth', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=50&time_range=short_term'
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


router.get('/usernameget', async (req, res, next) => {
  try {
    const url = 'https://api.spotify.com/v1/me/'
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



router.get("/data", async (req, res, next) => {
  const allDocData = []
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => allDocData.push(doc.data()))
  res.json({ result: allDocData })
})

router.get("/getSongs", async (req, res, next) => {
  const allDocData = []
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  
  const docRef = doc(db, "cities", req.body.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    allDocData.push(docSnap.data().songs);
    res.json({ result: allDocData })
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
})//NEW 1


router.put("/put/songs", async (req, res, next) => {
  const postRef = doc(db, "users", req.body.id);
  
  await updateDoc(postRef, {
    songs: arrayUnion(req.body.songs)
  });
  res.send("Received1")
})

router.put("/getTopArtists", async (req, res, next) => {
  console.log(req.body.artists);

  const postRef = doc(db, "users", req.body.id);
  await updateDoc(postRef, {
    artists: req.body.artists
  });
  res.send("Received2")
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

router.post("/newuser", async (req, res, next) => {
  const newUser = {
    spotifyUsername: req.body.spotifyUsername,
    username: req.body.username,
    isPublic: req.body.isPublic,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    id: req.body.id
  }

  const docRef = await addDoc(collection(db, "users"), newUser)
  const postRef = doc(db, "users", docRef.id);
  await updateDoc(postRef, {
    id: docRef.id
  });

  res.send("Received")
})

module.exports = router;
