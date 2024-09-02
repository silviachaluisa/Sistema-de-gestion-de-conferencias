import request from "supertest";
import app from "../../src/server.js"
import { connection , desconnection } from "../../src/database.js";

beforeAll(async () => {
    await connection();
    });
    
    //________________________________________________________________________________________________________
    
    describe("POST api/conferen/registro", () => {
        test("Debería responder con un código 200 y los datos son correctos", async () => {
            const registerData = {
                
                    _id: "66d5cfaa693e0ae582a3bf9e",
                    nombre: "Samantha",
                    apellido: "Sosa",
                    cedula: 2745386,
                    genero: "nose",
                    ciudad: "Loja",
                    direccion: "otros",
                    fechanacimiento: "2024-09-02T14:45:59.587Z",
                    telefono: "8935748",
                    email: "lizeth@gmail.com",
                    empresa: "NOSE X2"
                  
            }
            const response = await request(app)
            .post("/api/conferen/registro")
            .send(registerData) // Enviar datos con .send()
            .set('Accept', 'application/json'); // Asegurarse de que el servidor acepta JSON
    
            // Verificar que la respuesta sea exitosa
            expect(response.statusCode).toBe(200);  
        });
    
        test("Debería responder con un código 400 si faltan datos", async () => {
            const response = await request(app)
              .post("/api/conferen/registro")
              .send({ nombre: "", apellido: "",cedula:"", genero:"",ciudad:"",direccion:"",fechanacimiento:"", telefono:"",email:"",empresa:"" }); 
        
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty("msg","Lo sentimos, debes llenar todos los campos"); // Suponiendo que devuelves un error en el body
        });
    
        
    });
    
    
    
    afterAll(async () => {
    await desconnection();
    });