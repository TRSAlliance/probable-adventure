CREATE TABLE ghostshifts (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT,
    location TEXT NOT NULL,
    when_period TEXT NOT NULL,
    displacement TEXT[] NOT NULL,
    landed TEXT NOT NULL,
    quote TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    trustScore INTEGER,
    anonymous_hash TEXT
);

ALTER TABLE ghostshifts ENABLE ROW LEVEL SECURITY;
