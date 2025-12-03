
import { Request, Response } from 'express';
import {validationResult } from 'express-validator';
import Product from '../models/Product.model';
import { error } from 'console';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({data: product});
    }
    catch {
        console.error(error);
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        //Actualizar producto
        await product.update(req.body);
        await product.save();

        res.status(200).json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        //Actualizar producto
        // console.log("Actual", product.getDataValue('availability'));
        product.setDataValue('availability', !product.getDataValue('availability'));
        // console.log("Actualizado", product.availability);
        await product.save();

        res.status(200).json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}