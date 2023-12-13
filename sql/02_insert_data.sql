START TRANSACTION;

-- CLIENT
INSERT INTO client (name)
SELECT name FROM (
    SELECT 'Gigamarket' as name
    UNION ALL
    SELECT 'Constructo' as name
    UNION ALL
    SELECT 'Eleganckie meble' as name
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM client
);

-- LOCATION
INSERT INTO location (name, street, city, postcode, client)
SELECT name, street, city, postcode, client FROM (
    SELECT 'Hurtownia Constructo' as name,
           'Jana Pawła II' as street,
           'Słupsk' as city,
           '21/37' as postcode,
           2 as client
    UNION ALL
    SELECT 'Magazyn Eleganckie meble' as name,
           'Długa' as street,
           'Warszawa' as city,
           '6/9' as postcode,
           3 as client
    UNION ALL
    SELECT 'Hipermarket Gigamarket' as name,
           'Szymona Buraka' as street,
           'Słupsk' as city,
           '6/6/6' as postcode,
           1 as client
    UNION ALL
    SELECT 'Hurtownia Constructo' as name,
           'Krótka' as street,
           'Warszawa' as city,
           '12/34' as postcode,
           2 as client
    UNION ALL
    SELECT 'Hipermarket Gigamarket' as name,
           'Jana Pawła II' as street,
           'Słupsk' as city,
           '21/37' as postcode,
           1 as client
    UNION ALL
    SELECT 'Salon Eleganckie meble' as name,
           'Wolności' as street,
           'Warszawa' as city,
           '34/12' as postcode,
           3 as client
    UNION ALL
    SELECT 'Hipermarket Gigamarket' as name,
        'Napoleona Bonaparte' as street,
        'Warszawa' as city,
        '11' as postcode,
        1 as client
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM location
);

-- USER
-- Credentials:
-- 1: szymon.bulak@example.com - Bułak
-- 2: jacek.wolik@example.com - Wolik
-- 3: bartlomiej.komis@example.com - Komis
-- 4: bartek.miotek@example.com - Miotek
-- 5: kacper.smigielo@example.com - Smigieło
-- 6: piotr.troczki@example.com - Troczki
-- 7: kamil.grafika@example.com - Grafika
-- 8: kacper.zabijaka@example.com - Zabijaka
INSERT INTO user (email, password, salt, name, surname, role, employer)
SELECT email, password, salt, name, surname, role, employer FROM (
    SELECT
        'szymon.bulak@example.com' as email,
        'f50810de242e40526fcfaed7620b944272d2edc42fd6678a37088bf7c01ba322c58b79d877f1482513a6a3014f504f0fb7cb017b3b8068c1fa2c01e1bddde1bc' as password,
        '9d58133212af0282b9bf906200af692724bfa8c64db72b8742d9b74d6079bffe' as salt,
        'Szymon' as name,
        'Bułak' as surname,
        'ROLE_ADMIN' as role,
        NULL as employer
    UNION ALL
    SELECT
        'jacek.wolik@example.com' as email,
        'ac76a87310487eaa297caa6f8b71e88e1af89cf96c181b95f6c11c3a3e3496aeb0027c15aa9f7ac28cb832efefa24fc7c7a20be7cbee10bde92be80ee3a402a0' as password,
        'da7bdcd2b2c32043a6e4f1c415d69d5c28b84614cfcd223619e2cedd18756c9e' as salt,
        'Jacek' as name,
        'Wolik' as surname,
        'ROLE_OFFICE' as role,
        NULL as employer
    UNION ALL
    SELECT
        'bartlomiej.komis@example.com' as email,
        '8f462b66b78c2f87fc832af43a7feddaee3933806ac41f087b51213af11bd8a2144b367ed0698e9277f4e6eec68e65b8e284865d13042b666eff4f1ba415c55e' as password,
        'af9faf9cdc901999305ca62b5eb982f763b398dfc26dbf9117fdebd98eb5dafc' as salt,
        'Bartłomiej' as name,
        'Komis' as surname,
        'ROLE_USER' as role,
        2 as employer
    UNION ALL
    SELECT
        'bartek.miotek@example.com' as email,
        'a051c43bec1cc2a664389ad65ab4bcbd86277037ef58290a6421c1cb17b9800453a931a33ad77b4e4d711aa78cba6c32a8507293c845e22ae9d8966c05312937' as password,
        'b56af599957e0792e1f3361501b1be7fb16e93d0dbfe44a196fed07f96fe7bfd' as salt,
        'Bartek' as name,
        'Miotek' as surname,
        'ROLE_USER' as role,
        2 as employer
    UNION ALL
    SELECT
        'kacper.smigielo@example.com' as email,
        '6e8f2aa78d6acf98c2f91071c853768e5dce3c21bd1ae370122b6e1899bb58ff41cda7074280aaa73ac0b900a9a44d4dfb4b7e223201b7fa401c4fcb1be638fb' as password,
        '6e9c8b72f9ca04864f4f6b947269db304e5b1288cf265b18db841cb90b8d7a66' as salt,
        'Kacper' as name,
        'Śmigieło' as surname,
        'ROLE_USER' as role,
        3 as employer
    UNION ALL
    SELECT
        'piotr.troczki@example.com' as email,
        '3903892fa7dffc26029e9406964ed1e082dc604284d6dc0cb32c5f9eb8ced39adc1ff39b418de75b0752944de6a733978dc0e68ba0b60b4247031b299083375f' as password,
        '28f6c2946ad762327816003475433f18e7e0867d03d6364e89bac866c26694da' as salt,
        'Piotr' as name,
        'Troczki' as surname,
        'ROLE_USER' as role,
        3 as employer
    UNION ALL
    SELECT
        'kamil.grafika@example.com' as email,
        'e88622c7f9a6575b755e40c72bc1f08a6fa988b7739141ff3ccb3c41e41d7b58140f1136c4a755386bd893b6350acfdcc0ec2877f174adcb8a5f3122698f27cd' as password,
        '56788d0a7811392ef9a08fda83dba6007d5cf3db4d41ed4e6226eab4273f7793' as salt,
        'Kamil' as name,
        'Grafika' as surname,
        'ROLE_USER' as role,
        1 as employer
    UNION ALL
    SELECT
        'kacper.zabijaka@example.com' as email,
        '6206d99e6667c27f42701bcd0d9f18f00a79fa535a9baf145ad0355c540cc67bcd22736b6b8a396022dca9ddc1c1baa987da42b3106e52da23a6857bc27ad2af' as password,
        'c6c7a34d13d7f8f94ada1aeb92e9e344a1d5082625c1fca9283deeafb8c540ac' as salt,
        'Kacper' as name,
        'Zabijaka' as surname,
        'ROLE_USER' as role,
        1 as employer
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM user
);

-- REPORT
INSERT INTO report (title, content, status, location_id, created_by)
SELECT title, content, status, location_id, created_by FROM (
    SELECT
        'Co to ma być!?' as title,
        'Robić nam kazali, to jakiś skandal! Ja zawodówki nie zdałem, a robić mi każą...' as content,
        'OPEN' as status,
        2 as location_id,
        4 as created_by
    UNION ALL
    SELECT
        'To są jakieś jaja' as title,
        'Robić nam kazali! TOWAR PRZENOSIĆ! Ja komputerowcem jestem, a nie jakimś robolem, do cholery!' as content,
        'IN_PROGRESS' as status,
        2 as location_id,
        3 as created_by
    UNION ALL
    SELECT
        'Generalnie rzecz biorąc problem jest' as title,
        'Piwo się na komputer wylało, płytę główną zalało, nie odpala się' as content,
        'IN_PROGRESS' as status,
        3 as location_id,
        6 as created_by
    UNION ALL
    SELECT
        'Generalnie rzecz biorąc jest problem' as title,
        'Piwo się na komputer wylało, płytę główną zalało, nie odpala się' as content,
        'DUPLICATE' as status,
        3 as location_id,
        5 as created_by
    UNION ALL
    SELECT
        'Towar nie dotarł' as title,
        'Pół roku temu zamówilismy u Państwa nowe półki sklepowe, bo nasze się już rozpadają (generalnie bieda), a dalej nie dotarły. Zróbcie coś z tym.' as content,
        'RESOLVED' as status,
        1 as location_id,
        7 as created_by
    UNION ALL
    SELECT
        'Reklamacja' as title,
        'Dzisiaj dotarły do nas nowe półki, rozpadły się godzinę po złożeniu, żądam zwrotu pieniędzy.' as content,
        'RESOLVED' as status,
        1 as location_id,
        8 as created_by
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM report
);

-- NOTIFICATION
INSERT INTO notification (content, report_id)
SELECT content, report_id FROM (
    SELECT
        'Status "To są jakieś jaja" został zmieniony na "W trakcie realizacji"' as content,
        2 as report_id
    UNION ALL
    SELECT
        'Nowy komentarz przy "To są jakieś jaja"' as content,
        2 as report_id
    UNION ALL
    SELECT
        'Status "Generalnie rzecz biorąc problem jest" został zmieniony na "W trakcie realizacji"' as content,
        3 as report_id
    UNION ALL
    SELECT
        'Status "Generalnie rzecz biorąc jest problem" został zmieniony na "W trakcie realizacji"' as content,
        4 as report_id
    UNION ALL
    SELECT
        'Status "Generalnie rzecz biorąc jest problem" został zmieniony na "Duplikat"' as content,
        4 as report_id
    UNION ALL
    SELECT
        'Status "Towar nie dotarł" został zmieniony na "W trakcie realizacji"' as content,
        5 as report_id
    UNION ALL
    SELECT
        'Nowy komentarz przy "Towar nie dotarł"' as content,
        5 as report_id
    UNION ALL
    SELECT
        'Status "Towar nie dotarł" został zmieniony na "Zrealizowane"' as content,
        5 as report_id
    UNION ALL
    SELECT
        'Status "Reklamacja" został zmieniony na "W trakcie realizacji"' as content,
        6 as report_id
    UNION ALL
    SELECT
        'Nowy komentarz przy "Reklamacja"' as content,
        6 as report_id
    UNION ALL
    SELECT
        'Status "Reklamacja" został zmieniony na "Zrealizowane"' as content,
        6 as report_id
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM notification
);

-- COMMENT
INSERT INTO comment (content, report_id, created_by)
SELECT content, report_id, created_by FROM (
    SELECT
        'Zawsze możesz przenosić towary w komputerze' as content,
        2 as report_id,
        2 as created_by
    UNION ALL
    SELECT
        'To nie nasz problem, dzwoń do dostawcy' as content,
        5 as report_id,
        1 as created_by
    UNION ALL
    SELECT
        'Zwrotów nie przyjmujemy' as content,
        6 as report_id,
        2 as created_by
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM comment
);

-- FILE
INSERT INTO file (filename, report_id, comment_id)
SELECT filename, report_id, comment_id FROM (
    SELECT
        'comment_20231101_135700_1_2' as filename,
        NULL as report_id,
        1 as comment_id
    UNION ALL
    SELECT
        'report_20231101_140200_6_8' as filename,
        6 as report_id,
        NULL as comment_id
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM file
);

-- USER_NOTIFICATION
INSERT INTO user_notification (user_id, notification_id)
SELECT user_id, notification_id FROM (
    SELECT 1 as user_id, 1 as notification_id
    UNION ALL
    SELECT 1 as user_id, 2 as notification_id
    UNION ALL
    SELECT 1 as user_id, 3 as notification_id
    UNION ALL
    SELECT 1 as user_id, 4 as notification_id
    UNION ALL
    SELECT
    1 as user_id, 5 as notification_id
    UNION ALL
    SELECT 1 as user_id, 6 as notification_id
    UNION ALL
    SELECT 1 as user_id, 7 as notification_id
    UNION ALL
    SELECT 1 as user_id, 8 as notification_id
    UNION ALL
    SELECT 1 as user_id, 9 as notification_id
    UNION ALL
    SELECT 1 as user_id, 10 as notification_id
    UNION ALL
    SELECT 1 as user_id, 11 as notification_id
    UNION ALL
    SELECT 2 as user_id, 1 as notification_id
    UNION ALL
    SELECT 2 as user_id, 2 as notification_id
    UNION ALL
    SELECT 2 as user_id, 3 as notification_id
    UNION ALL
    SELECT 2 as user_id, 4 as notification_id
    UNION ALL
    SELECT 2 as user_id, 5 as notification_id
    UNION ALL
    SELECT 2 as user_id, 6 as notification_id
    UNION ALL
    SELECT 2 as user_id, 7 as notification_id
    UNION ALL
    SELECT 2 as user_id, 8 as notification_id
    UNION ALL
    SELECT 2 as user_id, 9 as notification_id
    UNION ALL
    SELECT 2 as user_id, 10 as notification_id
    UNION ALL
    SELECT 2 as user_id, 11 as notification_id
    UNION ALL
    SELECT 3 as user_id, 1 as notification_id
    UNION ALL
    SELECT 3 as user_id, 2 as notification_id
    UNION ALL
    SELECT 5 as user_id, 4 as notification_id
    UNION ALL
    SELECT 5 as user_id, 5 as notification_id
    UNION ALL
    SELECT 6 as user_id, 3 as notification_id
    UNION ALL
    SELECT 7 as user_id, 6 as notification_id
    UNION ALL
    SELECT 7 as user_id, 7 as notification_id
    UNION ALL
    SELECT 7 as user_id, 8 as notification_id
    UNION ALL
    SELECT 8 as user_id, 9 as notification_id
    UNION ALL
    SELECT 8 as user_id, 10 as notification_id
    UNION ALL
    SELECT 8 as user_id, 11 as notification_id
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM user_notification
);

-- REPORT_HANDLED_BY
INSERT INTO report_handled_by (report_id, user_id)
SELECT report_id, user_id FROM (
    SELECT 2 as report_id, 2 as user_id
    UNION ALL
    SELECT 3 as report_id, 2  as user_id
    UNION ALL
    SELECT 4 as report_id, 1 as user_id
    UNION ALL
    SELECT 4 as report_id, 2 as user_id
    UNION ALL
    SELECT 5 as report_id, 1 as user_id
    UNION ALL
    SELECT 6 as report_id, 2 as user_id
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM report_handled_by
);

COMMIT;