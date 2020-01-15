const { User } = require('../modules/User')

// user registration
module.exports.register = (req,res) => {
    new User(req.body).save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
}

// user login
module.exports.login = (req,res) => {
    const { email, password } = req.body
    User.findByCredentials(email,password)
        .then((user) => {
            user.generateToken()
                .then((token) => {
                    res.send({token})
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

// user account
module.exports.account = (req,res) => {
    const { user } = req
    res.send(user)
}

// user logout
module.exports.logout = (req,res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token: token}}})
        .then(() => {
            res.send('Successfully logged out')
        })
        .catch((err) => {
            res.send(err)
        })
}