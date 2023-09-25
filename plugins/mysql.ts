import mysql from 'mysql2';

export default defineNuxtPlugin(() => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'service',
    })
    connection.connect()

    return {
        provide: {
            mysql: connection
        }
    }
})
