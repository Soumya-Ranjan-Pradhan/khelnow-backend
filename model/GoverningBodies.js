import mongoose from 'mongoose';

const GoverningBodiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sportsType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports', 
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },
});

const GoverningBodiesSchemaModel = mongoose.model("GoverningBodies", GoverningBodiesSchema);

export default GoverningBodiesSchemaModel
