CREATE TABLE comments (
       id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
       user_id INT REFERENCES users(id) NOT NULL,
       post_id INT REFERENCES posts(id) NOT NULL,
       content VARCHAR(128) NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
)
