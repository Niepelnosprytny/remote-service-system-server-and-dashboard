import mysql from 'mysql2';

export default defineNuxtPlugin(() => {

    const connection = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        password: 'password',
        database: 'service',
    })
    connection.connect();

    // Table users {
    //     id integer [primary key]
    //     email varchar
    //     password varchar
    //     name varchar
    //     surname varchar
    //     role varchar
    //     reports_made array_of_reports
    //     handled_reports array_of_reports
    //     comments array_of_comments
    //     employer client
    // }
    // Table notifications {
    //     id integer [primary key]
    //     users_send array_of_users
    //     report report
    //     content varchar
    // }
    // Table clients {
    //     id integer
    //     name varchar
    //     locations array_of_locations
    //     employees array_of_users
    // }
    // Table comments {
    //     id integer
    //     report_id report
    //     content varchar
    //     created_by user
    //     created_at datetime_immutable
    //     files array
    // }
    //
    // Table reports {
    //     id integer
    //     content varchar
    //     title varchar
    //     status enum
    //     handled_by array_of_users
    //     comments array_of_comments
    //     location location
    //     files array
    //     created_by user
    //     created_at datetime_immutable
    // }
    //
    // Table locations {
    //     id integer
    //     name varchar
    //     address varchar
    //     client client
    //     reports array_of_reports
    // }
    //
    // Ref: users.id < comments.created_by // many-to-one
    // Ref: users.id < reports.created_by
    // Ref: users.id > reports.handled_by
    // Ref: clients.id - locations.client
    // Ref: locations.id - reports.location
    // Ref: comments.report_id > reports.id

//Ref: users.id < follows.following_user_id

//Ref: users.id < follows.followed_user_id

    connection.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(254) NOT NULL,
            password CHAR(64) NOT NULL,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            role ENUM('ROLE_ADMIN', 'ROLE_OFFICE', 'ROLE_USER') NOT NULL,
            employer INT NOT NULL
        );`
    );

    connection.query(`
        CREATE TABLE IF NOT EXISTS notification (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            content VARCHAR(255),
            report_id INT NOT NULL,
            FOREIGN KEY (report_id) REFERENCES report(id)
        );`
    );

    connection.query(`
        CREATE TABLE IF NOT EXISTS user_notification (
            user_id INT,
            notification_id INT,
            PRIMARY KEY (user_id, notification_id),
            FOREIGN KEY (user_id) REFERENCES user(id),
            FOREIGN KEY (notification_id) REFERENCES notification(id)
        );`
    );

    connection.query(`
        CREATE TABLE IF NOT EXISTS report (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'DUPLICATE') NOT NULL
        );`
    );

    connection.query(`
        CREATE TABLE report_handled_by (
            report_id INT,
            user_id INT,
            PRIMARY KEY (report_id, user_id),
            FOREIGN KEY (report_id) REFERENCES report(id),
            FOREIGN KEY (user_id) REFERENCES user(id)
        );`
    );

    connection.query(`
        CREATE TABLE IF NOT EXISTS file (
            id INT PRIMARY KEY,
            filename VARCHAR(255),
            report_id INT,
            FOREIGN KEY (report_id) REFERENCES reports(report_id)
        );`
    );

    return {
        provide: {
            mysql: connection
        }
    }
});