const secret = process.env.SECRET;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterService = (userRepository) => { 
  return async (req, res) => {
    // Password hashing
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const { firstName, lastName, email, city } = req.body;
    try {
      const result = await userRepository.createUser(firstName, lastName, email, city, hashedPassword);
      const {user_id, first_name, last_name} = result.rows[0];
      const token = jwt.sign({ id: user_id }, secret);
      return res
        .cookie("jwt", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
          httpOnly: true,
          secure: false,
        })
        .status(201)
        .json({
          last_name: last_name,
          first_name: first_name,
        });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
};

// Export
module.exports = { RegisterService };

