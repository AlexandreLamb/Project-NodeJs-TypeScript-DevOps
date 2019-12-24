export {}


const registerUser = async (req, res) => {
    try {  
        res.render("register.ejs")
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = registerUser;
