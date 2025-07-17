import {pool} from './database.js';

class LibrosController{

    async getAll(req, res){
        const result = await pool.query('SELECT * FROM libros_dechat');
        res.json(result);
    }
}

export const libros = new LibrosController();