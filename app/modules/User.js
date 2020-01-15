const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email){
                return validator.isEmail(email)
            },
            message: function(){
                return 'Provide a valid email'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// pre hook
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encryptedPassword) => {
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})

// own static method
userSchema.statics.findByCredentials = function(email,password){
    const User = this
    return User.findOne({email})
        .then((user) => {
            if(!user){
                return Promise.reject('Invalid email/password')
            }
            if(password){
                return bcryptjs.compare(password, user.password)
                .then((result) => {
                    if(result){
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject('Invalid password/email')
                    }
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
            } else {
                return Promise.reject('Please provide the password')
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function(token){
    const User = this

    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}

// Own instance method
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })
    return user.save()
        .then(() => {
            return Promise.resolve(token)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
