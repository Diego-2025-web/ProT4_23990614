import { pool } from './database.js';

class LibrosController {
async getAll(req, res) {
    try {
      const [rows] = await pool.query('SELECT * FROM libros_dechat');
    res.json(rows);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros', details: error.message });
    }
}

async getOne(req, res) {
    try {
    const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM libros_dechat WHERE id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(rows[0]);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro', details: error.message });
    }
}

async create(req, res) {
    try {
    const { nombre, autor, categoria, 'año-publicacion': año-publicacion, ISBN } = req.body;

    if (!nombre || !autor || !categoria || !año-publicacion || !ISBN) {
        return res.status(400).json({ error: 'Faltan campos requeridos (nombre, autor, categoria, año-publicacion, ISBN)' });
    }

    const [result] = await pool.query(
        'INSERT INTO libros (nombre, autor, categoria, `año-publicacion`, ISBN) VALUES (?, ?, ?, ?, ?)',
        [nombre, autor, categoria, año-publicacion, ISBN]
    );

    res.status(201).json({ id: result.insertId, nombre, autor, categoria, 'Publicado en año: ': año-publicacion, ISBN });
    } catch (error) {
    res.status(400).json({ error: 'Error al crear el libro', details: error.message });
    }
}

async update(req, res) {
    try {
    const { id } = req.params;
    const { nombre, autor, categoria, 'año-publicacion': año-publicacion, ISBN } = req.body;

      const [existing] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
    if (existing.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await pool.query(
        'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, `año-publicacion` = ?, ISBN = ? WHERE id = ?',
        [nombre, autor, categoria, año-publicacion, ISBN, id]
    );

    res.json({ message: 'Libro actualizado correctamente' });
    } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el libro', details: error.message });
    }
}

async delete(req, res) {
    try {
    const { isbn } = req.params;

      const [libros] = await pool.query('SELECT * FROM libros WHERE ISBN = ?', [isbn]);

    if (libros.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado con ese ISBN' });
    }

    const libroAEliminar = libros[0];

    await pool.query('DELETE FROM libros WHERE ISBN = ?', [isbn]);

    res.json({
        message: 'Libro eliminado correctamente',
        libro: libroAEliminar
    });

    } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro', details: error.message });
    }
}
}


export const libros = new LibrosController();
