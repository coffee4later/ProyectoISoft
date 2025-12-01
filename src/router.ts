import {Router} from 'express';
import {createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct} from './handlers/product';
import {body, param} from 'express-validator';
import {handleInputErrors} from './middleware';

const router = Router();
// routing
router.get('/', getProducts);
router.get('/:id',
    param('id').isInt().withMessage('El ID debe ser un nùmero entero'),
    handleInputErrors,
    getProductById);

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