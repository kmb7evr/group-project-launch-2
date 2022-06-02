const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc, query, where, Timestamp, increment} = require("firebase/firestore")

router.get("/conversations", async(req, res, next) => {
    const messages = []
    const name=req.query.name //name of user
    const allMess = query(collection(db, "messages"), where("user", "==", name));
    const allMessages = await getDocs(allMess);
    allMessages.forEach((doc) => messages.push({id: doc.id, ...doc.data()}))

    messages.sort((a, b) => {
        let time1 = a.time,
            time2 = b.time;

        if (time1 < time2) {
            return 1;
        }
        if (time1 > time2) {
            return -1;
        }
        return 0;
    });

    const contactsOrgTime = []
    for(let i=0; i<messages.length; i++) {
        if (!contactsOrgTime.includes(messages[i].otherUser)) {
            contactsOrgTime.push(messages[i].otherUser)
        }
    }
    res.json({result: contactsOrgTime})
})

router.get("/indivConversation", async(req, res, next) => {
    const messages = []

    const name=req.query.name.split('?')[0] //name of user
    const otherName=req.query.name.split('?')[1] //name of otherUser
    const allMess = query(collection(db, "messages"), where("user", "==", name), where("otherUser", "==", otherName)); // may need to change this query
    const allMessages = await getDocs(allMess);
    allMessages.forEach((doc) => messages.push({id: doc.id, ...doc.data()}))

    messages.sort((a, b) => {
        let time1 = a.time,
            time2 = b.time;

        if (time1 < time2) {
            return 1;
        }
        if (time1 > time2) {
            return -1;
        }
        return 0;
    });

    res.json({result: messages})
})

router.post("/newMessage", (req, res, next) => {
    const newMessage1 = { //message sent by user
        message: req.body.Message,
        user: req.body.name,
        otherUser: req.body.otherUser,
        sent: true,
        time: Timestamp.now(),
    }
    const newMessage2 = { //message recieved by other user
        message: req.body.Message,
        user: req.body.otherUser,
        otherUser: req.body.name,
        sent: false,
        time: Timestamp.now(),
    }

    addDoc(collection(db, "messages"), newMessage1)
    .then((docRef) => {
        console.log("sent")
      })
    .catch((e) => console.error(e))

    
    addDoc(collection(db, "messages"), newMessage2)
    .then((docRef) => {
        console.log("recieved")
      })
    .catch((e) => console.error(e))
})

router.get("/getUsers", async(req, res, next) => {
    const users=[]
    const allUsers = await getDocs(collection(db, "users"))
    allUsers.forEach((doc) => users.push({ id: doc.id, ...doc.data()} ))

    const userNamesOnlyArr=[]
    for(let i=0; i<users.length; i++) {
        userNamesOnlyArr.push(users[i].spotifyUsername)
    }

    //console.log(userNamesOnlyArr)
    res.json({result: userNamesOnlyArr})
})

module.exports = router