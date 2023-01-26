const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../../config/connection');

//Login Function
const login = async (req, res) => {
const { email, password } = req.body;

try {
const data = await pool.query(`SELECT * FROM public."Users" WHERE email= $1;`, [email]) //Verifying if the user exists in the database
const user = data.rows;
if (user.length === 0) {
res.status(400).json({
error: "User is not registered, Sign Up first",
});
}
else {
bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
if (err) {
res.status(500).json({
error: "Server error",
});
} else if (result === true) { //Checking if credentials match
const token = jwt.sign(
{
email: email,
},
"process.env.SECRET_KEY"
);
res.status(200).json({
message: "User signed in!",
token: token,
});
}
else {
//Declaring the errors
if (result != true)
res.status(400).json({
error: "Enter correct password!",
});
}
})
}
} catch (err) {
console.log(err);
res.status(500).json({
error: "Database error occurred while signing in!", //Database connection error
});
};
};

module.exports = {
    login
}