import {Router} from 'express';
import {createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct} from './handlers/product';
import {body, param} from 'express-validator';
import {handleInputErrors} from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *              description: ID del producto
 *              example: 1
 *          name:
 *              type: string
 *              description: Nombre del producto
 *              example: Monitor Curvo 27 Pulgadas
 *          price:
 *              type: number
 *              description: Precio del producto
 *              example: 299.99
 *          availability:
 *              type: boolean
 *              description: Disponibilidad del producto
 *              example: true
 *
 *
 *
 */
// routing

/**
 * @swagger
 * /productos:
 *      get:
 *          summary: Obtener todos los productos
 *          tags:
 *               - Productos
 *          description: Obtiene una lista de todos los productos disponibles
 *          responses:
 *                200:
 *                   description: Successful response
 *                   content:
 *                      application/json:
 *                        schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/Product'
 *
 *
 */
router.get('/', getProducts);

/**
 * @swagger
 * /productos/{id}:
 *     get:
 *         summary: Obtener un producto por ID
 *         tags:
 *              - Productos
 *         description: Obtiene los detalles de un producto específico mediante su ID
 *         parameters:
 *          - in: path
 *            name: id
 *            description: ID del producto
 *            required: true
 *            schema:
 *                type: integer
 *
 *         responses:
 *              200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Product'
 *              404:
 *                description: Producto no encontrado
 *              400:
 *                description: ID inválido
 *
 *
 *
*/
router.get('/:id',
    param('id').isInt().withMessage('El ID debe ser un nùmero entero'),
    handleInputErrors,
    getProductById);


    /**
 * @swagger
 * /productos:
 *     post:
 *        summary: Crear un nuevo producto
 *        tags:
 *            - Productos
 *        description: Crea un nuevo producto con el nombre y precio proporcionados
 *        requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       name:
 *                           type: string
 *                           example: Monitor Curvo 27 Pulgadas
 *                       price:
 *                           type: number
 *                           example: 299.99
 *        responses:
 *          400:
 *              description: Datos inválidos
 *          201:
 *              description: Producto creado exitosamente
 *
*/

router.post('/',

    body('name', 'El nombre es obligatorio')
        .notEmpty(),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .custom(value => typeof value ==='number' &&  value > 0 ).withMessage('El precio debe un nùmero mayor a 0'),
    handleInputErrors,
    createProduct
);


router.put('/:id',
    body('name', 'El nombre es obligatorio')
        .notEmpty(),
    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .custom(value => typeof value === 'number' && value > 0).withMessage('El precio debe un nùmero mayor a 0'),
    body('availability')
        .isBoolean().withMessage('La disponibilidad debe ser true o false'),
    param('id').isInt().withMessage('El ID debe ser un nùmero entero'),
    handleInputErrors,
    updateProduct);

router.patch('/:id',
    param('id').isInt().withMessage('El ID debe ser un nùmero entero'),
    handleInputErrors,
    updateAvailability);


router.delete('/:id',
    param('id').isInt().withMessage('El ID debe ser un nùmero entero'),
    handleInputErrors,
    deleteProduct
);

export default router;