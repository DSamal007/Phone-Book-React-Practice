const Contact = require('../modules/contact')

module.exports.list = (req, res) => {
    const { user } = req
    let pageNo= parseInt(req.query.pageNo)
    let size = parseInt(req.query.size)
    let query = {}
    if(pageNo<0 || pageNo === 0){
        response = {"error": true, "message":"invalid page no, should start with 1"}
        return res.json(response)
    }
    query.skip  = size*(pageNo - 1)
    query.limit = size
    Contact.find({user: user._id})
  
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.count = (req,res) => {
    const { user } = req
    Contact.countDocuments({user: user._id})
        .then((count) => {
            res.json({count})
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Contact.findOne({_id: id, user: user._id})
    
        .then((contact) => {
            if(contact){
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const { body, user } = req
    body.user = user._id
    const contact = new Contact(body)
    contact.save()
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Contact.findOneAndUpdate({_id: id, user: user._id}, body, {new: true, runValidators: true})
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Contact.findOneAndDelete({_id: id, user: user._id})
        .then((contact) => {
            if(contact){
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}