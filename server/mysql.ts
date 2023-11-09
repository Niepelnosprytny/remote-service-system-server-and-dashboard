import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'mysql', // Your MySQL host
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'service', // Your MySQL database
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

export default pool;