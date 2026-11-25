DROP TABLE IF EXISTS ai_models;

CREATE TABLE IF NOT EXISTS ai_models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    editor TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    genre TEXT NOT NULL,
    rating REAL NOT NULL CHECK (rating >= 0 AND rating <= 10)
);

INSERT INTO ai_models (title, editor, release_year, genre, rating) VALUES
('ChatGPT', 'OpenAI', 2022, 'Language Model', 9.5),
('DALL-E', 'OpenAI', 2021, 'Image Generation', 9.0),
('Stable Diffusion', 'Stability AI', 2022, 'Image Generation', 8.5),
('MidJourney', 'MidJourney Inc.', 2022, 'Image Generation', 8.0),
('Bard', 'Google', 2023, 'Language Model', 7.5);