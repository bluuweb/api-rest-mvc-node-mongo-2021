const router = require('express').Router()
const {body} = require('express-validator')

const todoController = require('../controllers/todoController')

const validarToken = require('../middleware/validarToken')
const validarBody = require('../middleware/validarBody')

router.get('/id/:id', validarToken, todoController.todo)

router.get('/',[
    validarToken
], todoController.todos)

router.post('/', [
    validarToken,
    body('texto', 'ingrese un texto válido').trim().notEmpty(),
    validarBody
], todoController.addTodo)

router.delete('/:id', [
    validarToken
], todoController.delete)

router.put('/:id', [
    validarToken,
    body('texto', 'ingrese un texto válido').trim().notEmpty(),
    body('done', 'ingrese un done').trim().notEmpty(),
    validarBody
], todoController.update)

module.exports = router