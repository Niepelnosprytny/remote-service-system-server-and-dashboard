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