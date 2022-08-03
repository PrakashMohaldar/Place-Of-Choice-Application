const express = require('express')
const router = express.Router();
const {check} = require('express-validator')
/*file upload is object with bunch  of middle ware*/ 
const fileUpload = require('../middleware/file-upload')
const {
        getPlaceById,
        getPlacesByUserId,
        createPlace,
        updatePlace,
        deletePlace
    } = require('../controllers/places-controllers');






router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post('/',
fileUpload.single('image'),
[
    check('title').not().isEmpty(),
    check('description').isLength({min:5})
], createPlace);

router.patch('/:pid',[
    check('title').not().isEmpty(),
    check('description').isLength({min:5})
], updatePlace )

router.delete('/:pid', deletePlace )

module.exports = router ;