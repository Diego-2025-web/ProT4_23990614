import mysqlConnection from 'mysql2/promise';

const properties = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'api-rest'
	};
//import mysqlConnection
//public MySqlConnection()
export const pool = mysqlConnection.createPool(properties);

const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log('Conectado a la base de atos');
		connection.release();
	} catch (err) {
		console.error('Error al conectar a la base de gatos:', err.message);
	}
};

testConnection();
