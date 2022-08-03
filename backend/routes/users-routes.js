const express = require('express')
const {check} = require('express-validator');
const router = express.Router();
const fileUpload = require('../middleware/file-upload')
const {
    getUser,
    signup,
    login
} = require('../controllers/user-controller')

router.get('/', getUser ) 
router.post('/signup',
    fileUpload.single('image'),
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        /*normalizeEmail does Test@gmail.com => test@gmail.com*/
        check('password').isLength({min:5})
    ], 
    signup )
router.post('/login', login )

module.exports = router;