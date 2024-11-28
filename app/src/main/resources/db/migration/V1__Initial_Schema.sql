-- Users table
CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    image_url VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Clubs table
CREATE TABLE clubs (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) REFERENCES users(user_id)
);

-- Club members junction table
CREATE TABLE club_members (
    club_id BIGINT REFERENCES clubs(id),
    user_id VARCHAR(255) REFERENCES users(user_id),
    PRIMARY KEY (club_id, user_id)
);

-- Posts table
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES users(user_id),
    club_id BIGINT NOT NULL REFERENCES clubs(id)
);

-- Comments table
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES users(user_id),
    post_id BIGINT REFERENCES posts(id),
    parent_comment_id BIGINT REFERENCES comments(id)
);

-- Post likes junction table
CREATE TABLE post_likes (
    post_id BIGINT REFERENCES posts(id),
    user_id VARCHAR(255) REFERENCES users(user_id),
    PRIMARY KEY (post_id, user_id)
);

-- Comment likes junction table
CREATE TABLE comment_likes (
    comment_id BIGINT REFERENCES comments(id),
    user_id VARCHAR(255) REFERENCES users(user_id),
    PRIMARY KEY (comment_id, user_id)
);
