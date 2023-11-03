export const createTables = (connection) => {
    // CLIENT
    // Each location belongs to one client
    connection.query(`
        CREATE TABLE IF NOT EXISTS client (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        );`
    );

    // LOCATION
    // Many locations can belong to one client
    connection.query(`
        CREATE TABLE IF NOT EXISTS location (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            client INT NOT NULL,
            FOREIGN KEY (client) REFERENCES client(id)
        );`
    );

    // USER
    // Many users can belong to one client as their employee
    connection.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(254) NOT NULL,
            password CHAR(64) NOT NULL,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            role ENUM('ROLE_ADMIN', 'ROLE_OFFICE', 'ROLE_USER') NOT NULL,
            employer INT NOT NULL,
            FOREIGN KEY (employer) REFERENCES client(id)
        );`
    );

    // REPORT
    // Each report is associated with one location and one creator (user)
    connection.query(`
        CREATE TABLE IF NOT EXISTS report (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'DUPLICATE') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            location_id INT NOT NULL,
            created_by INT NOT NULL,
            FOREIGN KEY (location_id) REFERENCES location(id),
            FOREIGN KEY (created_by) REFERENCES user(id)
        );`
    );

    // NOTIFICATION
    // Each notification is linked to one report
    connection.query(`
        CREATE TABLE IF NOT EXISTS notification (
            id INT PRIMARY KEY AUTO_INCREMENT,
            content VARCHAR(255),
            report_id INT NOT NULL,
            FOREIGN KEY (report_id) REFERENCES report(id)
        );`
    );

    // COMMENT
    // Each comment is associated with one report and one creator (user)
    connection.query(`
        CREATE TABLE IF NOT EXISTS comment (
            id INT PRIMARY KEY AUTO_INCREMENT,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            report_id INT NOT NULL,
            created_by INT NOT NULL,
            FOREIGN KEY (report_id) REFERENCES report(id),
            FOREIGN KEY (created_by) REFERENCES user(id)
        );`
    );

    // FILE
    // Each file is linked optionally to one report or comment
    connection.query(`
        CREATE TABLE IF NOT EXISTS file (
            id INT PRIMARY KEY AUTO_INCREMENT,
            filename VARCHAR(255) NOT NULL,
            report_id INT,
            comment_id INT,
            FOREIGN KEY (report_id) REFERENCES report(id),
            FOREIGN KEY (comment_id) REFERENCES comment(id)
        );`
    );

    // USER_NOTIFICATION
    // A junction table connecting users and notifications to track who receives notifications
    connection.query(`
        CREATE TABLE IF NOT EXISTS user_notification (
            user_id INT,
            notification_id INT,
            PRIMARY KEY (user_id, notification_id),
            FOREIGN KEY (user_id) REFERENCES user(id),
            FOREIGN KEY (notification_id) REFERENCES notification(id)
        );`
    );

    //REPORT_HANDLED_BY
    // A junction table linking reports and users to track who handled a specific report
    connection.query(`
        CREATE TABLE IF NOT EXISTS report_handled_by (
            report_id INT,
            user_id INT,
            PRIMARY KEY (report_id, user_id),
            FOREIGN KEY (report_id) REFERENCES report(id),
            FOREIGN KEY (user_id) REFERENCES user(id)
        );`
    );
};