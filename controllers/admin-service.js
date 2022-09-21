// GET list of users
const getUsers = (userRepository) => { 
    return async (req, res) => {
        let users;
        try {
            users = await userRepository.findAll();
        } catch (err) {
            return res.status(400).json({ message: err });
        }
        res.json({ data: users.rows });
    }
};

// DELETE actions
const deleteActions = (actionRepository) => { 
    return async (req, res) => {
        try {
            await actionRepository.UpdateActionToCancelStatus(req);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
        res.status(200).json({ message: "Action deleted" });
    }
};

// DELETE user
const deleteUser = (userRepository) => { 
    return async (req, res) => {
        try {
            await userRepository.UpdateUserToNullAttributes(req);
            return res.status(200).json({
                message: "User deleted",
            })
        } catch (err) {
            return res.status(400).json({
                message: err,
            })
        }
    }
};

// Export
module.exports = { getUsers, deleteActions, deleteUser };
