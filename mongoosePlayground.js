const mongoose = require('mongoose');

//connects to mongodb with mongoose
mongoose.connect('mongodb://localhost:27017/tweets', {
    useNewUrlParser: true
});

const tweetsSchema = new mongoose.Schema({
    handle: String,
    body: String
});

const Tweet = mongoose.model('Tweet', tweetsSchema);   //creating a tweet model by saying what it should be called and what schema is should use

Tweet
    .create({ handle: 'ryan', body: 'my first tweet' })
    .then(createdTweet => {
        return Tweet.findById(createdTweet._id);
    })
    .then(foundTweet => console.log(foundTweet));

Tweet
    .findById('5cb61a65696e02546e1c587e')
    .then(foundTweet => console.log(foundTweet))
    .finally(() => {
        mongoose.connection.close();     //ends your interaction (before this, you were having to ctrl c in the terminal to be able to enter new stuff)
    });

Tweet
    .findByIdAndUpdate('5cb61a65696e02546e1c587e', { handle: 'spot' }, { new: true })
    .then(updatedTweet => console.log(updatedTweet))
    .finally(() => {
        mongoose.connection.close(); 
    });
