const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/** 
* Create a new user account
* @param {object} req - request
* @param {object} res - response
* @param {function} next - method next : continue execution in the next middleware
*/
exports.signup = (req, res, next) => {
    // we salt the password 10 times
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                // 201 : successfully created a user (Created)
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                // 400 : bad request
                .catch((error) => res.status(400).json({ error }));
        })
        // 500 : internal server error
        .catch((error) => res.status(500).json({ error }));
};

/** 
* Log into the app
* @param {object} req - request
* @param {object} res - response
* @param {function} next - method next : continue execution in the next middleware
*/
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
                // 401 : unauthorized
               return res.status(401).json({ message: 'Login ou mot de passe incorrect'});
           }
           // compare password with hash
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                        // 401 : unauthorized
                        return res.status(401).json({ message: 'Login ou mot de passe incorrect'});
                   }
                   // 200 : successful request (OK)
                   res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId : user._id }, 
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                   });
               })
            // 500 : internal server error
            .catch((error) => {res.status(500).json({ error })});
       })
       // 500 : internal server error
       .catch((error) => res.status(500).json({ error }));
};