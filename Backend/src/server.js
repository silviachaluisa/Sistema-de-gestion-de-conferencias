//Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
//Importacion de la variable router usuario
import routerUsuarios from './routers/usuario_routes.js'
import routerConferens from './routers/conferens_routes.js'
import routerAuditorios from './routers/auditorio_routes.js'
import routerReservas from './routers/reserva_routes.js'

//Inicializaciones
const app=express() 
dotenv.config()

//Configuraciones
app.set('port' ,process.env.PORT || 3000)
app.use(cors())

//Middlewares
app.use(express.json())

// Rutas
app.get('/' ,(req,res)=>{
    res.send("Servidor OK")
})
app.use('/api',routerUsuarios)
app.use('/api',routerConferens)
app.use('/api',routerAuditorios)
app.use('/api',routerReservas)


//Manejo de una ruta que no sea encontrada
app.use(( req,res) => res.status(404).send("Endpoint no encontrado - 404"))


//Exportar la instancia de express por medio de app
export default app
