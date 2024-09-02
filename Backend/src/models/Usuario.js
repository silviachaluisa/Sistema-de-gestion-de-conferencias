import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema ({

   
    email:{ 
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    
    password:{
        type:String,
        default:true,
        unique:true
    }
},{
    timestamps:true

})

//Metodo para cifrar el password del usuario

usuarioSchema.methods.encrypPassword= async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp=await bcrypt.hash(password,salt)
    return passwordEncryp
}

//Metodo para verificar que el password ingresado es el mismo de la BDD
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

//Metodo crear un token
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = This.token = Match.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Usuario', usuarioSchema)