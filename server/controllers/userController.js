const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/Models');
const JWT_SECRET='sOKkbeZJIbQLszWtjCheHh981SIaCRQG';

// Sign Up
const signUp = async (req, res) => {
    try {
        const { email, password, confirmPassword, full_name } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({ email, password: hashedPassword, full_name });

        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sign In
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Sign-in successful', token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signUp, signIn };
