import mysql from 'mysql2';

let pool;

export default defineNuxtPlugin(() => {
    pool = mysql.createPool({
        host: 'mysql',
        user: 'root',
        password: 'password',
        database: 'service',
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0
    });

    return {
        provide: {
            mysql: pool.promise()
        }
    }
});