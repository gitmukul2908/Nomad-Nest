const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const Place = require('./models/Place')
const Booking = require('./models/Booking')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader')
const multer = require('multer')
const fs = require('fs');
require('dotenv').config()


const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "iondoaofmo329002ekopkkfdapkpkdkkdfk90k"


app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cookieParser());


mongoose.connect(process.env.MONGO_DB_URI)

// test
app.get('/', (req, res) => {
    res.json({"message": "Test OK"})
})


// to register an user
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(user)

    } catch (error) {
        res.status(422).json({ error: error.message })
    }
})


// to login an user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const check = bcrypt.compareSync(password, user.password);
            if (check) {
                jwt.sign({ id: user._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                })
            }
            else {
                res.json('pass not ok')
            }
        }
        else {
            res.json('Not found')
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


// to fetch user profile and verify its login
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err
            const { name, email } = await User.findById(user.id)
            res.json({ name, email })
        })
    }
    else {
        res.json(null)
    }
})


// to upload an image by link
app.post('/upload-by-link', async (req, res) => {
    try {
        const { link } = req.body
        const newName = Date.now() + '.jpg';
        await download.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });

        res.json(newName)

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


//to upload photo from your device
const photoMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }

    res.json(uploadedFiles)
})


// to add new place in account
app.post('/add-new-place', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price } = req.body;

        const user = jwt.verify(token, jwtSecret)
        const place = await Place.create({
            owner: user.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });

        res.json(place);


    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})

// to get all the places of all users
app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

// to get all the places of a particular user
app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, jwtSecret);
    res.json(await Place.find({ owner: user.id }))
})


// to get details of places for(specific id)
app.get('/places/:id', async (req, res) => {
    const { id } = req.params
    const data = await Place.findById(id);
    res.json(data);
})


// update a place
app.put('/update-place', async (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, jwtSecret)

    const { id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price } = req.body;

    const { owner } = await Place.findById(id);
    if (user.id === owner.toString()) {
        await Place.findByIdAndUpdate(id, {
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        res.json('ok')
    }
})


// to book a place
app.post('/bookings', async (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, jwtSecret)

    const { place, checkIn, checkOut,
        numberOfGuests, name, phone, price } = req.body;

    const bookingInfo = await Booking.create({
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price, user: user.id
    })

    res.json(bookingInfo)

})


// to get all the bookings
app.get('/bookings', async (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, jwtSecret);
    res.json(await Booking.find({ user: user.id }).populate('place'))
})


// to logout user
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})


app.listen(process.env.API_PORT, () => {
    console.log("Listening on port " + process.env.API_PORT);
})

module.exports = app