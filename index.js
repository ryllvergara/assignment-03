import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const users = [];
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .post('/signup', (req, res) => {
        const { firstName, lastName, email, password, repassword } = req.body;
        console.log('Signup Request:', req.body)
        // Basic validation
        if (password !== repassword) {
            return res.status(400).send({ message: "Passwords do not match." });
        }

        // Check for existing user
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).send({ message: "An account with this email already exists." });
        }

        // Create and store new user
        const newUser = { firstName, lastName, email, password: password };
        users.push(newUser);
        console.log(`User registered: ${email}. Total users: ${users.length}`);
        res.status(201).send({ 
            message: "User registered successfully.", 
            user: {firstName, email} 
        });
    })
    .post('/login', (req, res) => {
        const { username, password } = req.body;
        console.log('Login Request:', req.body);
        const user = users.find(user => user.email === username);

        if (!user) {
            return res.status(401).send({ message: "No account found with that email." });
        }

        if (user.password === password) {
            res.status(200).json({
                message: `Login successful! Welcome, ${user.firstName}.`,
                user: { firstName: user.firstName, email: user.email }
            });
        } else {
            res.status(401).send({ message: "Incorrect password. Please try again." });
        }
    })

    .listen(PORT, () => {
        console.log(`Server has started at http://localhost:${PORT}`);
    });
