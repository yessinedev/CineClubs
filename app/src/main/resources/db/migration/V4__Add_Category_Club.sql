-- Create the categories table
CREATE TABLE categories
(
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Add category_id to the clubs table
ALTER TABLE clubs
    ADD COLUMN category_id BIGINT NOT NULL;
ALTER TABLE clubs
    ADD CONSTRAINT clubs_category_fk FOREIGN KEY (category_id) REFERENCES categories (id);

-- Add is_public to the clubs table
ALTER TABLE clubs
    ADD COLUMN is_public BOOLEAN NOT NULL DEFAULT FALSE;

-- Add created_at and updated_at to the clubs table
ALTER TABLE clubs
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE clubs
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
--Add id column to club_members table
ALTER TABLE club_members
    DROP CONSTRAINT IF EXISTS club_members_pkey;
ALTER TABLE club_members
    ADD COLUMN id BIGSERIAL PRIMARY KEY;
-- Add status and role to the club_members table
ALTER TABLE club_members
    ADD COLUMN status VARCHAR(255) DEFAULT 'PENDING';
ALTER TABLE club_members
    ADD COLUMN role VARCHAR(255) DEFAULT 'MEMBER';

-- Add joined_at, created_at, and updated_at to the club_members table
ALTER TABLE club_members
    ADD COLUMN joined_at TIMESTAMP;
ALTER TABLE club_members
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE club_members
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add updated_at to the posts table
ALTER TABLE posts
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
