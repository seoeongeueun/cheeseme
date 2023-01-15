import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
    date: {type: Number, required: true, unique: true},
    goals: [
        { 
            id: Number,
            text: String,
            check: Boolean,
        }
    ]
});

const Todos = mongoose.model("Todos", todosSchema);

export default Todos;