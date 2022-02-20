const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const { registerValidator, loginValidator } = require('../validation/validation');
const registeradmin = async (req, res) => {
    try {
        const { error } = registerValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password, name, apartment } = req.body;
        const adminExists = await Admin.findOne({ email });

        const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (adminExists) {
            throw new Error('Account already exists');
        }

        const newadmin = await new Admin({
            email,
            password: encryptedPassword,
            name,
            apartment
        });
        await newadmin.save();

        res.json({
            message: `${name} registered Successfully`,
            email,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const loginadmin = async (req, res) => {
    console.log(req);
    try {
        const { error } = loginValidator(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            throw new Error("Account doesn't exists");
        }

        const passwordCheck = await bcrypt.compare(password, admin.password);

        if (passwordCheck) {
            const { emailDb } = admin;
            const data = { email: emailDb };
            const authToken = jwt.sign(data, process.env.SECRET_KEY_TO_ACCESS);
            res.json({
                auth: email,
                error: false,
                authToken,
                admin,
                message: 'Logged in successfully'
            });
        } else {
            throw new Error('Wrong password');
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { registeradmin, loginadmin };
