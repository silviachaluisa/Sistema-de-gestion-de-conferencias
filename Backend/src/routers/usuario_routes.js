import {Router} from 'express'
//Importar todos los métodos del controlador
 import{
   login,
   registro,
   detalleUsuario,
   perfil
}from "../controllers/usuario_controller.js";
import verificarAutenticacion from '../middlewares/autenticacion.js';

//Se crea una instancia de router
const router = Router()

//Rutas Públicas
router.post("/login",login);
router.post("/registro",registro);

//Rutas Privadas
router.get("/usuario/:id",verificarAutenticacion,detalleUsuario);
router.get("/perfil",verificarAutenticacion ,perfil);

export default router