CREATE TABLE IF NOT EXISTS personnes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    favorite_model_id INTEGER
);

INSERT OR IGNORE INTO personnes (id, first_name, last_name, favorite_model_id) VALUES
    (1, 'Alice', 'Martin', 2),
    (2, 'Karim', 'Benali', 3),
    (3, 'Chloé', 'Durand', 9),
    (4, 'Lucas', 'Petit', NULL);