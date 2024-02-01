const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CongesSchema = new Schema({
    DateDebut: {
        type: Date , 
        required: true
    },
    DateFin: {
        type: Date , 
        required: true
    },
    Raison: {
        type: String , 
        required: true
    },
    Attachement: {
        type: String 
    },
    resultat: {
        type: String,
        default: "en cours",
        enum: ["en cours", "accepte", "refuse"]
    },    
    employee:[
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        }
      ],
    
}, { timestamps: true})

module.exports = mongoose.model('Conges', CongesSchema)
