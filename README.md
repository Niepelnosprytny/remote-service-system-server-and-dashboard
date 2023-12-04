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

You can find example user credentials in comment above user table in /sql/02_insert_data.sql file.