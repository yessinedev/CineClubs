-- Messages table
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES users(user_id),
    club_id BIGINT NOT NULL REFERENCES clubs(id)
);

-- Create indexes for better performance
CREATE INDEX idx_messages_club_id ON messages(club_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at); 