const router = require("express").Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const isAuthenticated = require("../middleware/isAuthenticated");

// /api/auth/signup
router.post("/signup", (req, res, next)=>{
    console.log("/SIGNUP!!!!");
    const { username, password } = req.body;

    //comprovacions de camps
    if(username === "" || password === "") return res.status(500).json({error: "falten camps"});

    User.findOne({username})
    .then(user => {
        if(user) return res.json({error: "l'usuari ja existeix"});

        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordEnc = bcrypt.hashSync(password, salt);

        User.create({
            username,
            password: passwordEnc
        })
        .then(user => {
            res.json({username: user.username});
        })
        .catch(err => next(err))
    })
    .catch(err => {
        next(err);
    })
})

// /api/auth/login
router.post("/login", (req, res, next) => {
    const {username, password} = req.body;

    //comprovacions bàsiques

    User.findOne({username})
    .then(user => {
        if(!user) return res.json({error: "credencials incorrectes"});
        if(! bcrypt.compareSync(password, user.password)) return res.json({error: "credencials incorrectes"})

        const payload = {username: user.username, rol: "Admin"};
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "24h"}
        );
        console.log("AUTH TOKEN: ", authToken);
        res.json({authToken});

    })
    .catch(err => next(err))
})

// /api/auth/verify
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.json(req.payload);
})

module.exports = router;