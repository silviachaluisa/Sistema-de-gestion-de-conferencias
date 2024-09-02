import{ Schema,model } from "mongoose";
import bcrypt from "bcryptjs"

const auditorioSchema=new Schema({ 

    cedula:{
        type:Number,
        require:true,
        trim:true,
        unique:true
    },
    nombre:{
        type:String,
        require:true,
        trim:true,
    },
    ubicacion:{
        type:String,
        require:true,
        trim:true,  
    },
    capacidad:{
        type:Number,
        require:true,
        trim:true, 
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    
},{timestamps:true
    
})

export default model('Auditorios',auditorioSchema)