import mysqlConnection from 'mysql2/promise';

const properties = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'rest-api'
	};
import mysqlConnection
export cont pool = mysqlConnection.createPool(properties);
