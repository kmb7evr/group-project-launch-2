var express = require('express');
var router = express.Router();
const db = require("./firebase")
const {getDocs, collection, addDoc} = require("firebase/firestore")


router.get("/data", async (req, res, next) => {
  const allDocData = []
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => allDocData.push(doc.data()))
  res.json({result: allDocData})
})

module.exports = router;
