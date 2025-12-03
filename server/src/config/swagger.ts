import swaggerJSDoc from "swagger-jsdoc";
const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Productos",
                description: "Operaciones relacionadas con productos"

            }
        ],
        info: {
            title: "API de Productos",
            version: "1.0.0",
            description: "API para gestionar productos"
        }
    },
    apis: ["./src/router.ts"]
}
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;