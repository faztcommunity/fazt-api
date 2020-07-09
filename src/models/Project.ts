import { Schema, model, Document } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    // active, deleted, canceled, deprecated
    type: String,
    default: 'active',
    enum: ['active', 'deleted', 'canceled', 'deprecated']
  },
  tags: [
    {
      type: String
    }
  ]
}, {
  timestamps: true
});


export interface IProject extends Document {
  name: string;
  description: string;
  status: 'active' | 'deleted' | 'canceled' | 'deprecated';
  tags: string[];
}


export default model<IProject>('Project', ProjectSchema);
