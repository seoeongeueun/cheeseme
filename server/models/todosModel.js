import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    date: {type: Number, required: true},
    goals: [
        { 
            id: Number,
            text: String,
            check: Boolean,
        }
    ],
    smile: {type: Boolean, required: true}
});

const Todos = mongoose.model("Todos", todosSchema);

export default Todos;
