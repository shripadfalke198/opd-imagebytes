const express = require('express')
const mongoose = require('mongoose')
const Patient = require('./model/models')
const Treatment = require('./model/models')


const app = express()
app.use(express.json());
const bodyParser = require('body-parser')


mongoose.connect('mongodb://0.0.0.0:27017/opd', 
{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
 console.log('connected to db')
}).catch((error) => {
 console.log(error)
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})


app.post('/addPatient', (req, res) => {
    fullName = req.body.fullName,
    phone = req.body.phone,
    sex = req.body.sex,
    age = req.body.age,
    address = req.body.address

   let newPatient = new Patient({
    fullName: fullName,
    age: age,
    phone: phone,
    address: address,
    sex: sex,
    })

    newPatient.save().then((patient) => {
     res.send(patient)
    }).catch((error) => {
     console.log(error)
    })
})

app.get('/getPatient/:id', async (req, res) =>{
    const id = new mongoose.Types.ObjectId(req.params.id);
    Patient.findById(id)
    .then((patient)=>{
        res.send(patient)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.delete('/deletePatient/:id', (req, res) => {
    Patient.deleteOne({_id : req.params.id})
    .then(() => {
        res.send('patient deleted')
    }).catch((err) => {
        console.log(err)
    })
})

app.post('/updatePatient/:id', (req, res) => {
    let patientInfo = {}
    if (req.body.fullName) patientInfo.fullName = req.body.fullName
    if (req.body.age) patientInfo.age = req.body.age
    if (req.body.phone) patientInfo.phone = req.body.phone
    if (req.body.address) patientInfo.address = req.body.address
    if (req.body.sex) patientInfo.sex = req.body.sex
    Patient.updateOne({_id: id}, { '$set': patientInfo })
    .then((patient) => {
        res.send(patient)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.post('/addTreatment/:id', (req, res) => {
    let treatmentInfo = {}
    if (req.body.weight) treatmentInfo.weight = req.body.weight
    if (req.body.height) treatmentInfo.height = req.body.height
    if (req.body.heartRate) treatmentInfo.heartRate = req.body.heartRate
    if (req.body.bloodPressure) treatmentInfo.bloodPressure = req.body.bloodPressure
    if (req.body.temperature) treatmentInfo.temperature = req.body.temperature
    if (req.body.diagnosis) treatmentInfo.diagnosis = req.body.diagnosis
    if (req.body.treatment) treatmentInfo.treatment = req.body.treatment
    if (req.body.specialComment) treatmentInfo.specialComment = req.body.specialComment

    // weight: 
    //height:
    // heartRate: 
    // bloodPressure: 
    // temperature: 
    // diagnosis: 
    // treatment: 
    // specialComment: 
    treatmentInfo.patientId = req.params.id;

   let newTreatment = new Treatment(treatmentInfo)

    newTreatment.save().then((treatment) => {
        res.send(treatment)
    }).catch((error) => {
        console.log(error)
    })
})

app.get('/getPatientTreatmentHistory/:id', async (req, res) =>{
    const patientId = req.params.id;
    Treatment.find({patientId})
    .then((patient)=>{
        res.send(patient)
    })
    .catch((err)=>{
        console.log(err)
    })
})

