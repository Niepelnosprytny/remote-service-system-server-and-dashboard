START TRANSACTION;

-- CLIENT
CREATE TABLE IF NOT EXISTS client (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- LOCATION
CREATE TABLE IF NOT EXISTS location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    client INT NOT NULL,
    FOREIGN KEY (client) REFERENCES client(id) ON DELETE CASCADE
);

-- USER
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    password CHAR(64) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    role ENUM('ROLE_ADMIN', 'ROLE_OFFICE', 'ROLE_USER') NOT NULL,
    employer INT,
    FOREIGN KEY (employer) REFERENCES client(id) ON DELETE CASCADE
);

-- REPORT
CREATE TABLE IF NOT EXISTS report (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'DUPLICATE') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location_id INT NOT NULL,
    created_by INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES user(id) ON DELETE CASCADE
);

-- NOTIFICATION
CREATE TABLE IF NOT EXISTS notification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    report_id INT NOT NULL,
    FOREIGN KEY (report_id) REFERENCES report(id) ON DELETE CASCADE
);

-- COMMENT
CREATE TABLE IF NOT EXISTS comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    report_id INT NOT NULL,
    created_by INT NOT NULL,
    FOREIGN KEY (report_id) REFERENCES report(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES user(id) ON DELETE CASCADE
);

-- FILE
CREATE TABLE IF NOT EXISTS file (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    report_id INT,
    comment_id INT,
    FOREIGN KEY (report_id) REFERENCES report(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE
);

-- USER_NOTIFICATION
CREATE TABLE IF NOT EXISTS user_notification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    notification_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (notification_id) REFERENCES notification(id) ON DELETE CASCADE
);

-- REPORT_HANDLED_BY
CREATE TABLE IF NOT EXISTS report_handled_by (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (report_id) REFERENCES report(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

COMMIT;