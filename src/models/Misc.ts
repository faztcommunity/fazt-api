import {Schema, model} from 'mongoose';
const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export default model("Misc", NewsSchema);