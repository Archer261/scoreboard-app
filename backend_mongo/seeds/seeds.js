const mongoose = require('mongoose');
const User = require('../schemas/User');

mongoose.connect(`mongodb+srv://lb-admin:XzD1B4CAifch6txP@lb-cluster.5touh1m.mongodb.net/leaderboard-db`,
    {
        // user: process.env.MONGO_DATABASE_USER,
        // pass: process.env.MONGO_DATABASE_PASSWORD,
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    },
    () => console.log('You are now connected'),
    (e) => console.error(e)
);

// const u = new User({
//     name: 'Joseph'
// })

const seedUsers = [
    {
        name: 'Archer',
        email: 'keiju334@gmail.com',
        password: 'Sycobeast1!'
    }
]

User.insertMany(seedUsers)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
// User.save().then(u => {
//     console.log(u)
// })
//     .catch(e => {
//         console.log(e)
//     })

// const seedMatch = [{
// {contestants:[{}]}
// }]