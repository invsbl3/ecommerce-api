const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


const signUp =  async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "existing user found with same email or name" })
    }
    cart = {};
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

}

const login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });


        }
        else {
            res.json({ success: false, error: "Wrong User or Password" });
        }

    }
    else {
        res.json({ success: false, error: "Wrong User or Password" });
    }
}


module.exports = {
    signUp,
    login
};