const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
exports.Postgres = Postgres;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// Login route
const LoginService = (userRepository) => { 
  return async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userRepository.selectUserByEmail(email);
      if (user.rows === 0) {
        res.status(400).json({
          message: "Invalid email",
        });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user.rows[0].user_id }, secret);
      res
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({
          last_name: user.rows[0].last_name,
          first_name: user.rows[0].first_name,
        });

      console.log("after json");
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  }
};

// Export
module.exports = { LoginService };
