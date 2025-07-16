import mysql from 'mysql2/promise';

const properties = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'api-rest'
	};
//import mysqlConnection
export const pool = mysql.createPool(properties);

const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log('✅ Conectado a la base de datos');
		connection.release();
	} catch (err) {
		console.error('❌ Error al conectar a la base de datos:', err.message);
	}
};

testConnection();
