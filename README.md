# Webpages

Each of the following components are considered separate webpages on our website:

```javascript
discoverPage.js
forum.js
Inbox.js
likedSongs.js 
loginPage.js
topArtists.js
topSongs.js
userProfile.js
logout.js
```


API calls:

### auth.js

#returns data containing a callback url
router.get("/", async (req, res, next)

#returns data containing an access token as data.token
router.get("/callback", async (req, res, next)


### user.js

#returns all of the users in the Firebase collection “users”

#returns the Spotify username of the current user

#updates the current user’s privacy settings (same functionality as /username, /firstname, /lastname, and /email)

#when a new user logs in that isn’t already in the Firebase collection “users,” adds them to the “users”


#returns the liked songs of a user given their access token
# offset denotes how many songs to skip before retrieving
# limit denotes how many songs to retrieve
router.get('/likedSongs', async (req, res, next)

#retruns the top songs of a user given their access token
# offset denotes how many songs to skip before retrieving
# limit denotes how many songs to retrieve
# time_range denotes how far back to calculate the top songs, short, medium, or long term
router.get('/trackAll', async (req, res, next)

#retruns the top artists of a user given their access token
# offset denotes how many artists to skip before retrieving
# limit denotes how many artists to retrieve
# time_range denotes how far back to calculate the top artists, short, medium, or long term
router.get('/artistAll', async (req, res, next)

#Returns the user’s top 50 tracks over the past year
router.get('/trackYear', async (req, res, next) => {

#Returns the user’s top 50 tracks over the past month
router.get('/trackMonth', async (req, res, next) => {
### forum.js

#returns forum posts for a specific forum
fetch("http://localhost:9000/forum/forumPosts?name=" + forumName)

#allows user to post in a forum
axios.post("http://localhost:9000/forum/postedInForum", {
     forumName: forumName,
     Message: messageRef.current.value,
     user: user,
     forumId: id
   })


#allows user to like a forum post
await axios.put("http://localhost:9000/forum/likePost", {
     id: id,
     user: user
   })


#allows user to create new forum
axios.post("http://localhost:9000/forum/createForum", {
     forumName: newForumNameRef.current.value,
     creator: user
   })


### inbox.js

#returns the conversation that a specific user has
fetch("http://localhost:9000/inbox/getUsers")

#returns a specific conversation with another user
fetch("http://localhost:9000/inbox/indivConversation?name=" + userName + "?" + contact)







