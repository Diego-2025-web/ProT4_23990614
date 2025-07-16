import { Router } from 'express';
import { libros } from './controller.js';

export const router = Router();

router.get('/libros_dechat', libros.getAll);
router.get('/libros_dechat/:id', libros.getOne);
router.post('/libros_dechat', libros.create);
router.put('/libros_dechat/:id', libros.update);
router.delete('/libros_dechat/isbn/:isbn', libros.delete);
