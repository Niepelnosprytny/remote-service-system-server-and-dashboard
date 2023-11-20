START TRANSACTION;

-- CLIENT
INSERT INTO client (name)
SELECT name FROM (
    SELECT 'Bieda' as name
    UNION ALL
    SELECT 'Obinic Nierobi' as name
    UNION ALL
    SELECT 'Sklanki Mydła Wycieraczki' as name
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM client
);

-- LOCATION
INSERT INTO location (name, street, city, postcode, client)
SELECT name, street, city, postcode, client FROM (
    SELECT 'Sklep Obinic Nierobi' as name,
           'Jana Pawła II' as street,
           'Słupsk' as city,
           '21/37' as postcode,
           2 as client
    UNION ALL
    SELECT 'Magazyn Szklanki Mydła Wycieraczki' as name,
           'Długa' as street,
           'Warszawa' as city,
           '6/9' as postcode,
           3 as client
    UNION ALL
    SELECT 'Bieda' as name,
           'Szymona Buraka' as street,
           'Słupsk' as city,
           '6/6/6' as postcode,
           1 as client
) as source_data
WHERE NOT EXISTS (
    SELECT NULL
    FROM location
);

-- USER
-- Credentials:
-- 1: admin@admin.admin - admin
-- 2: jacek.walikokoski69@gmail.com - walekokoski
-- 3: komputerowiec10@wp.pl - komputerowiec10
-- 4: cotoemail@onet.pl - Podaj hasło
-- 5: prezes@icloud.com - jestemHardkorem
-- 6: piotr.troczki@outlook.com - mommy69
-- 7: kamil.furas@gmail.com - furrasyUwU
-- 8: kacper.zabijaka@gmail.com - zabijeCie
INSERT INTO user (email, password, name, surname, role, employer)
SELECT email, password, name, surname, role, employer FROM (
    SELECT
        'admin@admin.admin' as email,
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' as password,
        'Szymon' as name,
        'Bułak' as surname,
        'ROLE_ADMIN' as role,
        NULL as employer
    UNION ALL
    SELECT
        'jacek.walikokoski69@gmail.com' as email,
        'f1a8892e707454ba3794491979da9cb7b120ff3aa3fdedd3aa2d3998cd05e18d' as password,
        'Jacek' as name,
        'Walikokoski' as surname,
        'ROLE_OFFICE' as role,
        NULL as employer
    UNION ALL
    SELECT
        'komputerowiec10@wp.pl' as email,
        'b2c55ae7e64e01c92bc561678f98e19a9fde275f85f680500d6ee6f7dedaf722' as password,
        'Bartłomiej' as name,
        'Komis' as surname,
        'ROLE_USER' as role,
        2 as employer
    UNION ALL
    SELECT
        'cotoemail@onet.pl' as email,
        '397200da2aca4201edd0fd86cd3ef81b80c2a1715ff34794efaeca7c98afc4a7' as password,
        'Bartek' as name,
        'Miotek' as surname,
        'ROLE_USER' as role,
        2 as employer
    UNION ALL
    SELECT
        'prezes@icloud.com' as email,
        'ab59f2db271b7a53df33008a53943667ae6d787e5260475d32a0c639cb511fe7' as password,
        'Kacper' as name,
        'Śmigieło' as surname,
        'ROLE_USER' as role,
        3 as employer
    UNION ALL
    SELECT
        'piotr.troczki@outlook.com' as email,
        'c088a4dcc64abcb1fe8234afab5988fbd56dcde45f2989b5be9aa29395e3e4b8' as password,
        'Piotr' as name,
        'Troczki' as surname,
        'ROLE_USER' as role,
        3 as employer
    UNION ALL
    SELECT
        'kamil.furas@gmail.com' as email,
        '97f3292ad21e8f4feb64dc4f0006678f722dbabeb69ef749d061bac36bf28e50' as password,
        'Kamil' as name,
        'Furas' as surname,
        'ROLE_USER' as role,
        1 as employer
    UNION ALL
    SELECT
        'kacper.zabijaka@gmail.com' as email,
        '1c7377b2917c5261e9f1a0914412101a323af5bfe74ce46e4759b3d9b613aa9b' as password,
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