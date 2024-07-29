const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');


const router = express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm);
router.delete('/:firmId', firmController.deleteFirmById);


module.exports = router;