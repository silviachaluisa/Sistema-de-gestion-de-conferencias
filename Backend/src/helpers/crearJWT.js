import jwt from "jsonwebtoken";

const generarJWT = (id,rol)=>{
    return jwt.sign({id,rol},process.env.JWT_SECRET|| "Hola",{expiresIn:"1d"})
}

export default generarJWT