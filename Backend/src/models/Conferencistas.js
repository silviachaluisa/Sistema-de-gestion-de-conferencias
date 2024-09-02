import mongoose, {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const conferenSchema = new Schema({

    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    cedula:{
        type:Number,
        require:true,
        trim:true,
        unique:true
    },
    genero:{
        type:String,
        require:true,
        trim:true,
    },
    ciudad:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        require:true,
        trim:true
    },
    fechanacimiento:{
        type:Date,
        require:true,
        trim:true,
        default:Date.now()
    },
    telefono:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    
    empresa:{
        type:String,
        require:true,
        trim:true,
        
    },
    
   
 },{
    timestamps:true   
})

export default model('Conferencistas',conferenSchema)