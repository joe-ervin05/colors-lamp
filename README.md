# COLORS Application

A color management web application built with the LAMP stack that allows users to create accounts, log in, and maintain their personal collection of colors.

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- MD5.js for password hashing

### Backend
- PHP
- MySQL (with MySQLi driver)
- RESTful API architecture

### Stack
- LAMP (Linux, Apache, MySQL, PHP)

## Project Structure

```
colors-lab-gh/
|── api/
│   |── Login.php          # User authentication endpoint
│   |── AddColor.php       # Add color to user's collection
│   ─── SearchColors.php   # Search user's color collection
|── public/
│   |── index.html         # Login page
│   |── color.html         # Main color management interface
│   |── css/
│   │   ─── styles.css     # Application styles
│   ─── js/
│       |── code.js        # Main application logic
│       ─── md5.js         # Password hashing utility
─── images/                # Application images and assets
```

## Setup Instructions

### Prerequisites
- Apache web server
- MySQL database server
- PHP

### Database Setup

1. Create a MySQL database named `COP4331`

2. Create the required tables:

```sql
CREATE TABLE Users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    Login VARCHAR(50) UNIQUE,
    Password VARCHAR(50)
);

CREATE TABLE Colors (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    Name VARCHAR(50),
    FOREIGN KEY (UserId) REFERENCES Users(ID)
);
```

3. Create a MySQL user with appropriate permissions:
```sql
CREATE USER 'TheBeast'@'localhost' IDENTIFIED BY 'WeLoveCOP4331';
GRANT ALL PRIVILEGES ON COP4331.* TO 'TheBeast'@'localhost';
FLUSH PRIVILEGES;
```

### Application Setup (Digital Ocean LAMP Droplet)

1. Create a [LAMP droplet](https://marketplace.digitalocean.com/apps/lamp) and SSH into it

2. Set up the database by running `mysql -u root -p` and executing the SQL from the Database Setup section above

3. Create the directory structure in `/var/www/html`:
   ```bash
   mkdir css images js LAMPAPI
   ```

4. Upload files via SFTP to `/var/www/html`:
   - PHP API files → `api/`
   - CSS → `css/`
   - JavaScript → `js/`
   - Images → `images/`
   - HTML files → root

5. Update database credentials in the PHP API files

6. (Optional) Point your domain's A record to the droplet IP

## Running the Application

1. Start your Apache and MySQL services:
```bash
# On Linux
sudo systemctl start apache2
sudo systemctl start mysql

# On macOS (using MAMP/XAMPP)
# Start services through the control panel
```

2. Access the application in your web browser:
```
http://localhost:8080/colors-lab-gh/public/index.html
```

3. Log in with existing credentials or create a new user account in the database

4. After successful login, you'll be redirected to the color management interface where you can:
   - Add new colors to your collection
   - Search for colors you've saved
   - Log out when finished

## Features

- User authentication with secure login
- Cookie-based session management
- Personal color collection per user
- Add colors to your collection
- Search colors by name (partial matching supported)
- Clean, responsive user interface

## API Endpoints

- `POST /api/Login.php` - Authenticate user
- `POST /api/AddColor.php` - Add a new color to user's collection
- `POST /api/SearchColors.php` - Search user's color collection