import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'service',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

export default pool;