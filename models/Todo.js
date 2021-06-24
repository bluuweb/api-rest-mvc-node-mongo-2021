const {Schema, model} = require('mongoose')

const TodoSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    texto: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Todo = model('todo', TodoSchema)