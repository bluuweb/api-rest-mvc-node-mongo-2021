const Todo = require('../models/Todo')

exports.todo = async(req, res) => {
    try {
        const todo = await Todo.findOne({_id: req.params.id})
        if(!todo){
            return res.status(400).json({
                errors: [{msg: "No existe el todo 🤷‍♂️"}]
            })
        }

        if(todo.uid.toString() !== req.uid){
            return res.status(401).json({
                errors: [{msg: "Intentas acceder un todo que no es tuyo 🤬"}]
            })
        }

        return res.json({errors: false, todo })
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(400).json({
                errors: [{msg: "No es un id válido"}]
            })
        }
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        })
    }
}

exports.update = async(req, res) => {
    try {
        const todo = await Todo.findOne({_id: req.params.id})
        if(!todo){
            return res.status(400).json({
                errors: [{msg: "No existe el todo 🤷‍♂️"}]
            })
        }

        if(todo.uid.toString() !== req.uid){
            return res.status(401).json({
                errors: [{msg: "Intentas actualizar un todo que no es tuyo 🤬"}]
            })
        }
        const {texto, done} = req.body
        const todoUpdate = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                texto,
                done
            },
            {new : true}
        )
        return res.json({errors: false, todoUpdate })
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(400).json({
                errors: [{msg: "No es un id válido"}]
            })
        }
        if(error.kind === "Boolean"){
            return res.status(400).json({
                errors: [{msg: "No es un done válido"}]
            })
        }
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        })
    }
}
 
exports.delete = async(req, res) => {

    try {
        const todo = await Todo.findOne({_id: req.params.id})
        if(!todo){
            return res.status(400).json({
                errors: [{msg: "No existe el todo 🤷‍♂️"}]
            })
        }

        if(todo.uid.toString() !== req.uid){
            return res.status(401).json({
                errors: [{msg: "Intentas eliminar un todo que no es tuyo 🤬"}]
            })
        }
        await Todo.findByIdAndDelete(req.params.id)
        return res.json({errors: false, msg: "todo eliminado"})

    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(400).json({
                errors: [{msg: "No es un id válido"}]
            })
        }
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        })
    }

}

exports.todos = async(req, res) => {

    try {

        const todos = await Todo.find({uid: req.uid})

        return res.json({errors: false, todos})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        })
    }
}

exports.addTodo = async(req, res) => {

    try {
        let todo = new Todo(req.body)
        todo.uid = req.uid
        
        await todo.save()

        return res.json({errors: false, todo})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errors: [{msg: "Error de servidor"}]
        })
    }
}