import mongoose from 'mongoose';

const connection = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sistemaGestion';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Detener el servidor en caso de fallo
  }
};
const desconnection = async ()=>{
  try{
      //Cierra la coneccion
      await mongoose.disconnect();
      console.log("La base de datos ha sido desconectada");
  }catch(error){
      //Capturar Error en la desconeccion
      console.log(error)

  }

};



//Exportar la función
export {
  connection,
  desconnection   
} 
