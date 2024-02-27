# Remote Service System Server and Dashboard

Server & dashboard for remote service system. The server shall store all necessary data and handle requests, while the dashboard shall allow office employees to respond to malfunction reports and change their state.

To run the project, first create .env file and copy contents from .env.example into it.

When it's done, create SSL keys using this command

```bash
openssl req -x509 -newkey rsa:4096 -keyout ./ssl/key.pem -out ./ssl/cert.pem -days 365
```

Now, install Docker and Docker Compose if you don't have them already.

Then use this command to create the database with initial tables, populate it with data, install all dependencies, and run the dev server:

```bash
docker compose up
```

Here are example user roles, emails and passwords:
- **1**: ROLE_ADMIN - szymon.bulak@example.com - Bułak
- **2**: ROLE_OFFICE - jacek.wolik@example.com - Wolik
- **3**: ROLE_USER - bartlomiej.komis@example.com - Komis
- **4**: ROLE_USER - bartek.miotek@example.com - Miotek
- **5**: ROLE_USER - kacper.smigielo@example.com - Smigieło
- **6**: ROLE_USER - piotr.troczki@example.com - Troczki
- **7**: ROLE_USER - kamil.grafika@example.com - Grafika
- **8**: ROLE_USER - kacper.zabijaka@example.com - Zabijaka

## Server Endpoints

All server endpoints are located in the `/server/api` folder and are used to operate on the database. Most endpoints use generic code for their roles. Folder names in the `/api` route match table names in the database, with the exception of snake_case table names, which are changed to camelCase.

To access endpoints, you need to use the correct request type. For example, for `index.post.ts`, you need to use a POST request.

For example, to access `/api/comment/index.post.ts`, you need to send `POST` request to `/api/comment`.

All endpoints in `/api` (except for `/api/auth` routes) require a valid JWT token in the "authorization" header to access. Authorization is handled in server middleware.

Endpoints with `[id]` in their names accept an integer parameter in the URL, such as `/api/user/1`.

For example, to access `/api/comment/[id].delete.ts` to delete record with id 1, you need to send `DELETE` request to `/api/comment/1`.

All endpoints return errors if the data passed to them is incorrect or if they cannot perform their intended task.

### Generic Endpoints

- `index.post.ts`: Inserts a new record in the database. Accepts a JSON object with keys matching table keys.
- `index.get.ts`: Returns all records from the table.
- `[id].get.ts`: Returns the record with the given ID from the table.
- `[id].patch.ts`: Updates the record with the given ID in the table. Accepts a JSON object with keys matching table keys.
- `[id].delete.ts`: Deletes the record with the given ID from the table.

### Custom Endpoints

- `/api/index.post.ts`: Accepts a SQL query string and returns its results.
- `/api/auth`: These endpoints are used for user authentication and do not require authorization.
  - `index.get.ts`: Accepts a JWT token and returns user data connected with it.
  - `login/index.post.ts`: Accepts an email and plain password, returns a JWT token and user data.
  - `register/index.post.ts`: Accepts email, plain password, name, surname, role, and (optional) employer (client) ID. Creates a new user in the database and returns a JWT token and user data. Plain password is being hashed before inserting.
- `/api/comment/byReport/[id].get.ts`: Accepts a report ID as a URL parameter and returns data from the comment table for the given report ID.
- `/api/deviceToken/index.post.ts`: Works like the generic post endpoint, but checks if the same device token already exists. If it does, it updates the record instead of inserting a new one.
- `/api/file`: Some of these endpoints work on files, so they had to be customized. The function used to save files automatically optimizes videos and images.
  - `[id].delete.ts`: Works like the generic delete endpoint, but also removes the file from the server.
  - `[id].patch.ts`: Accepts multipart FormData with an optional file or files, optional report_id, and optional comment_id. It removes the old file and writes a new one if a file was passed in the request.
  - `index.post.ts`: Accepts multipart FormData with a file or files, optional report_id, and optional comment_id, and inserts new file record(s) into the database.
- `/api/notification/byUser/[id].get.ts`: Accepts a user ID as a URL parameter and returns data from the notification and user_notification tables for the given user ID.
- `/api/notification/index.post.ts`: Works like the generic post endpoint, but accepts an extra parameter, the `users` array, which contains IDs of users, and sends notifications through FCM. The users array is used to insert records into the user_notification table.
- `/api/report/index.post.ts`: Works like the generic post endpoint, but accepts an extra parameter, a `users` array that contains user IDs and is used to insert data into the report_handled_by table.
- `/api/user/[id].patch.ts`: Works like the generic patch endpoint, but hashes the plain password before inserting.
- `/api/user/index.post.ts`: Returns a message that says to use `/api/auth/register` instead.
- `/api/userNotification/updateSeen/index.patch.ts` - Takes `ids` array and `seen` boolean (0 or 1) as parameters. Updates `seen` value for all given `ids`.