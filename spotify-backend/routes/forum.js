const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc, query, where, Timestamp, increment} = require("firebase/firestore")

router.get("/forums", async (req, res, next) => {
    const forumTitles=[]
    const docs = await getDocs(collection(db, "forums"))
    docs.forEach((doc) => forumTitles.push({ id: doc.id, ...doc.data()} ))
    res.json({result: forumTitles})
})

router.get("/forumPosts", async (req, res, next) => {
    const name=req.query.name
    const forumPosts=[]
    const queryRes = query(collection(db, "forumPosts"), where("forum", "==", name));
    const matchingForumPosts = await getDocs(queryRes);
    matchingForumPosts.forEach((doc) => forumPosts.push({id: doc.id, ...doc.data()}))
    res.json({result: forumPosts})
})

router.post("/postedInForum", async (req, res, next) => {
    const newPost = {
        forum: req.body.forumName,
        message: req.body.Message,
        time: Timestamp.now(),
        poster: req.body.user,
        likers: []
    }
    addDoc(collection(db, "forumPosts"), newPost)
    .then((docRef) => {
        console.log("posted")
      })
    .catch((e) => console.error(e))

    const postRef = doc(db, "forums", req.body.forumId);
    await updateDoc(postRef, {
       posts: increment(1)
    });
    res.send("Received")
})

router.post("/createForum", (req, res, next) => {
    const newForum = {
        forumName: req.body.forumName,
        creator: req.body.creator,
        posts: 0
    }
    addDoc(collection(db, "forums"), newForum)
    .then((docRef) => {
        console.log("posted")
      })
    .catch((e) => console.error(e))
})

router.put("/likePost", async (req, res, next) => { //need to figure out how to add to an array
    const id=req.body.id;
    const postRef = doc(db, "forumPosts", id);
    const docSnap = await getDoc(postRef);
    const arr = docSnap.data().likers;
    arr.push(req.body.user);

    await updateDoc(postRef, {
        likers: arr
    });
    res.send("Updated")
})


module.exports = router