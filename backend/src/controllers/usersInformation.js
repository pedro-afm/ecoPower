const { UsersInformation } = require('../db/db');

// Fetching user information data to send it back to the frontend
const getUsersInformationController = async (req, res) =>{
    try {
        const userMail = req.query.parametro;
        const userInformation = await UsersInformation.find({"email": userMail});
        if (userInformation.length === 0) {
            return res.status(404).json({ message: 'No users information found' });
        }
        res.json(userInformation);
    } catch (error) {
        console.error("Error fetching charging user information from the database: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsersInformationController,
}