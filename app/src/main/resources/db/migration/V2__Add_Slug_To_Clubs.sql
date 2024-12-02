-- Add slug column
ALTER TABLE clubs ADD COLUMN slug VARCHAR(255);

-- Make it not null and unique
UPDATE clubs SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;

-- Add unique constraint and not null constraint
ALTER TABLE clubs ALTER COLUMN slug SET NOT NULL;
ALTER TABLE clubs ADD CONSTRAINT clubs_slug_unique UNIQUE (slug);

-- Create index for better performance
CREATE INDEX idx_clubs_slug ON clubs(slug);