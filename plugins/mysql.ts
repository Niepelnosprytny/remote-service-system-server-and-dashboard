import mysql from 'mysql2';
import {createTables} from "~/schema";
import {insertInitialData} from "~/data";

export default defineNuxtPlugin(() => {

    const connection = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        password: 'password',
        database: 'service',
    });

    connection.connect();

    createTables(connection);

    insertInitialData(connection);

    return {
        provide: {
            mysql: connection
        }
    }
});