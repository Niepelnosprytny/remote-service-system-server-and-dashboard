export const insertInitialData = (connection) => {

    // CLIENT
    connection.query(`
        INSERT INTO client (name)
        SELECT name FROM (
            SELECT 'Our service' as name
            UNION ALL
            SELECT 'Obinic Nierobi'
            UNION ALL
            SELECT 'Sklanki Mydła Wycieraczki'
        ) as source_data
        WHERE NOT EXISTS (
            SELECT NULL
            FROM client
        );`,
        (error, results, fields) => {
            if (error) throw error;
        });

    // LOCATION
    connection.query(`
        INSERT INTO location (name, address, client)
        SELECT name, address, client FROM (
            SELECT 'Sklep Obinic Nierobi' as name, 'Słupsk - Jana Pawła II 21/37' as address, 1 as client
            UNION ALL
            SELECT 'Magazyn Szklanki Mydła Wycieraczki', 'Warszawa', 2
            UNION ALL
            SELECT 'Location C', '789 Oak Street', 3
            UNION ALL
            SELECT 'Location D', '101 Pine Street', 1
            UNION ALL
            SELECT 'Location E', '202 Cedar Street', 2
        ) as source_data
        WHERE NOT EXISTS (
            SELECT NULL
            FROM location
        );`,
        (error, results, fields) => {
            if (error) throw error;
        });


    // USER
    connection.query(`
        INSERT INTO user (email, password, name, surname, role, employer)
        SELECT email, password, name, surname, role, employer FROM (
            SELECT 'user1@example.com' as email, 'password1' as password, 'John' as name, 'Doe' as surname, 'ROLE_ADMIN' as role, 1 as employer
            UNION ALL
            SELECT 'user2@example.com', 'password2', 'Jane', 'Smith', 'ROLE_USER', 2
            UNION ALL
            SELECT 'user3@example.com', 'password3', 'Bob', 'Johnson', 'ROLE_USER', 2
        ) as source_data
        WHERE NOT EXISTS (
            SELECT NULL
            FROM user
        );`,
        (error, results, fields) => {
            if (error) throw error;
        });

};