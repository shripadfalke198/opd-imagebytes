const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        enum: ['male','female','other']
    },
    address: {
        type: String,
        required: true
    }
})

const Patient = mongoose.model('patient', patientSchema)

module.exports = Patient;


const patientTreatmentSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    heartRate: {
        type: Number,
    },
    bloodPressure: {
        type: String,
    },
    temperature: {
        type: Number,
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    specialComment: {
        type: String,
    }
    // sex: {
    //     type: String,
    //     enum: ['male','female','other']
    // },
})

const Treatment = mongoose.model('treatment', patientTreatmentSchema)

module.exports = Treatment;