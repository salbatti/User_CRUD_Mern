const user = require('../models/userModels.js')

exports.addUser = async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body);

    try {
        const existingUser = await user.findOne({ email })

        if (existingUser) {
            return res.status(400).json('User already exist')
        }
        const newUser = new user({ username, email, password })
        await newUser.save()
        console.log(user);


        res.status(200).json({ message: "user added", newUser })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getUser = async (req, res) => {

    try {

        const allUser = await user.find()
        res.status(200).json({ message: "Users", allUser })

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateUser = async (req, res) => {

    const { id } = req.params
    const { username, email, password } = req.body
    try {
        const updatedUser = await user.findByIdAndUpdate
            (id, { username, email, password },
                { new: true }
            )
        res.status(200).json({ message: "user updated", updatedUser })
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.deleteUser = async (req, res) => {

    const { id } = req.params
    try {
         await user.findByIdAndDelete(id)
        res.status(200).json({ message: "user deleted"})

    } catch (err) {
        res.status(500).json(err)
    }
}