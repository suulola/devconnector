const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

// created modules
const db = require('./config/keys').mongoURI
const users = require('./routes/api/users')
const posts= require('./routes/api/posts')
const profile = require('./routes/api/profile')


mongoose.connect(db, { useNewUrlParser: true })
.then( () => console.log('MongoDB connected') )
.catch( (err) => console.log('Error:', err) )


app.get('/', (req, res) => res.send('hello'))

// Routes

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server started on port ${port}`))