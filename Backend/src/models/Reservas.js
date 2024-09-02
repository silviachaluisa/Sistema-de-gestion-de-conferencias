import mongoose, { Schema,model } from "mongoose";
import bcrypt from "bcryptjs"

const reservaSchema = new Schema({
    codigo:{
        type:Number,
        require:true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true,
    },
    auditorio:{
        type:Schema.Types.ObjectId,
        ref:"Auditorios",
        require:true,
        trim:true,
    },
    conferencista:{
        type:Schema.Types.ObjectId,
        ref:"Conferencistas",
        require:true,
        trim:true,
    }   
  },{timestamps:true  
})

export default model('Reservas',reservaSchema)