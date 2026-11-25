CREATE TABLE IF NOT EXISTS ai_models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    editor TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    genre TEXT NOT NULL,
    rating REAL NOT NULL CHECK (rating >= 0 AND rating <= 10)
);

INSERT OR IGNORE INTO ai_models (id, title, editor, release_year, genre, rating) VALUES
    (1, 'GPT-4', 'OpenAI', 2023, 'LLM', 9.0),
    (2, 'Claude 3 Opus', 'Anthropic', 2024, 'LLM', 9.0),
    (3, 'Llama 3', 'Meta', 2024, 'LLM open source', 8.5),
    (4, 'Mistral 7B', 'Mistral AI', 2023, 'LLM open source', 8.0),
    (5, 'Gemini 1.0', 'Google', 2023, 'LLM multimodal', 8.0),
    (6, 'Stable Diffusion', 'Stability AI', 2022, 'Image', 8.5),
    (7, 'Whisper', 'OpenAI', 2022, 'Audio', 9.0),
    (8, 'BERT', 'Google', 2018, 'NLP', 8.0),
    (9, 'ChatGPT', 'OpenAI', 2022, 'LLM', 9.0),
    (10, 'LLaMA', 'Meta', 2023, 'LLM open source', 7.5);