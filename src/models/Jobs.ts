import { Schema, model, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    description: string;
    date: Date;    
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
    date: {
        type: String,
        required: true
    },
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposals: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
},{
    timestamps: true
});

export default model<IJob>("Jobs", JobsSchema);
