import { Schema, model, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    description: string;
    date: Date;
    employer: string;
    employerEmail: string;
    proposals: Schema.Types.ObjectId[];
}

const JobsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employer: {
        type: String,
        required: true
    },
    employerEmail: {
        type: String,
        required: true
    },
    proposals: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
});

export default model<IJob>("Jobs", JobsSchema);
