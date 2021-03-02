DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    recipe_id VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email != ''),
    title VARCHAR(255) NOT NULL CHECK (title != ''),
    country VARCHAR(255),
    text TEXT NOT NULL CHECK (text != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);