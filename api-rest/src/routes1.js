import { Router } from 'express';
import { libros_dechat } from './controller.js';

export const router = Router();

router.get('/libros_dechat', libros_dechat.getAll);
router.get('/libros_dechat/:id', libros_dechat.getOne);
router.post('/libros_dechat', libros_dechat.create);
router.put('/libros_dechat/:id', libros_dechat.update);
router.delete('/libros_dechat/isbn/:isbn', libros_dechat.delete);
