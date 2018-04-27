var  userController = require('../controllers/userController')
var  express = require('express')

const router = express.Router()

/* GET users listing. */

router.get('/', userController.read)
router.get('/user', userController.user)
router.get('/filter', userController.readBy)
router.get('/:id', userController.getOne)

router.post('/', userController.create)
router.put('/', userController.update)
router.delete('/:id', userController.delete)

module.exports = router
