ALTER TABLE users
ADD CONSTRAINT check_race
CHECK (
    (
        race IN ('Hobbit', 'Elf', 'Dwarf', 'Man')
        AND NULLIF(BTRIM(kingdom), '') IS NOT NULL
        AND NULLIF(BTRIM(profession), '') IS NOT NULL
        AND NULLIF(BTRIM(house_clan), '') IS NOT NULL
    )
    OR
    (
        race IN ('Ent', 'Istar')
        AND kingdom IS NULL
        AND profession IS NULL
        AND house_clan IS NULL
    )
);