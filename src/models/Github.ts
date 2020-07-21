import { model, Schema } from 'mongoose';

const GithubSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true }
}, {
    timestamps: true
});

export default model('Github', GithubSchema);