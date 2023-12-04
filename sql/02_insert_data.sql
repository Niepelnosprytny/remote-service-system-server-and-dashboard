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
INSERT INTO user (email, password, salt, name, surname, role, employer)
SELECT email, password, salt, name, surname, role, employer FROM (
    SELECT
        'admin@admin.admin' as email,
        '370cec0f0214dcd402a20b583adbe8ed936aecc2e0df0e5c87af502a20b3d1014eefb642d2f06d65eeeb034ebc8a26b2e6e5aca7cd5b98a4f9c5f5ac21aee482' as password,
        '93c5a1b74930756b6476b795348dbc2dc82fbd90198ae2286165ba044efc0b3f' as salt,
        'Szymon' as name,
        'Bułak' as surname,
        'ROLE_ADMIN' as role,
        NULL as employer
    UNION ALL
    SELECT
        'jacek.walikokoski69@gmail.com' as email,
        '5b7cfc5e7eff31ff51db0270dd9f6246e9900d7af84cd4f30a8fbbd1463a2713917d0b421f94b662571e134977b3751b2f11284f3ac9152b933df5630722537e' as password,
        '170953a2bd2975cf69f38d1dd53755ab577f5d4b1156e3b00f4c0f9a7b3dc259' as salt,
        'Jacek' as name,
        'Walikokoski' as surname,
        'ROLE_OFFICE' as role,
        NULL as employer
    UNION ALL
    SELECT
        'komputerowiec10@wp.pl' as email,
        '2bb114a0073ca97c4f9898c95757f76a92964b06794a2dd7b4ec93816476fce948527882d5721f32c8ee8636fef8c361049e98ff73f677e95d2a4ae0c21d63f0' as password,
        '4ee8cc565b632755bb618cc5e0eec2defdd6d97225ab3b5ee368adfb167b0ca1' as salt,
        'Bartłomiej' as name,
        'Komis' as surname,
        'ROLE_USER' as role,
        2 as employer
    UNION ALL
    SELECT
        'cotoemail@onet.pl' as email,
        '925e9d4a6058b749155c75b3a990e851428bdeb5680a95b73a28ea4b6e8c972ecb1dbd506b678f9299f31220dc43fd41deff862704dd37f268f60bb82e2b86f1' as password,
        '98d649ff7288ae211418052fbf9854e0ce020e0258764b59156adbd34ce752b6' as salt,
        'Bartek' as name,
        'Miotek' as surname,
        'ROLE_USER' as role,
        2 as employer
    UNION ALL
    SELECT
        'prezes@icloud.com' as email,
        '67ef6c280ddea61a4b1f7be649b910c854f531fcc0feeacb8054db7969509f8b3c57d02c03762acf7c7354740cd29009787a54146029bf5c4f1d006bf6f2ba27' as password,
        '4ddb7632c96358f33d057354f608d244f9be42fb0df60e7fdb0af3e686da236b' as salt,
        'Kacper' as name,
        'Śmigieło' as surname,
        'ROLE_USER' as role,
        3 as employer
    UNION ALL
    SELECT
        'piotr.troczki@outlook.com' as email,
        '3ca4ae66f8618c79cefa42a291ee7e978dcedfe7169253e6cc4f701d91aee6254b34bead443aef357e97f388097a8f9b7e40a72bb92d19da4036609c77121199' as password,
        '194f9ad00f5f91261642b85aefa2d746b599b54ff7d2579b0372deeb6bf2a119' as salt,
        'Piotr' as name,
        'Troczki' as surname,
        'ROLE_USER' as role,
        3 as employer
    UNION ALL
    SELECT
        'kamil.furas@gmail.com' as email,
        'c8faa6ff88bb0bf537c330276d0def68e48ab648479d1adbe356a6262f5b19d0f90cd0e1fa04d82728797ccfd0310c79b78e1b23a50a80c62a3264e0fd780e05' as password,
        'edbbfd39b6cafb8993e9709eee92a64ab533e9583286b8eff746e5c6166a94f9' as salt,
        'Kamil' as name,
        'Furas' as surname,
        'ROLE_USER' as role,
        1 as employer
    UNION ALL
    SELECT
        'kacper.zabijaka@gmail.com' as email,
        'affc445f0bede657f2f901d572138a8cf86aa1b5cf72ceccb24b905e92bd7db908d41c49b39134180be1e193d161bd5414c4eaac26e49e872850c6c087bcb467' as password,
        '9059e469a31b57deece2004ef3375eb4e37f1bdaba385384874f736a14392978' as salt,
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