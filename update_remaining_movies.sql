USE cinema;

-- Update remaining movies with default images
UPDATE movies SET 
    imageUrl = CONCAT('/images/', LOWER(REPLACE(REPLACE(title, ':', ''), ' ', '')), 
    backdropUrl = CONCAT('/images/', LOWER(REPLACE(REPLACE(title, ':', ''), ' ', '')) 
WHERE title = 'Dune: Part Two'
   OR title = 'Oppenheimer'
   OR title = 'Barbie'
   OR title = 'The Batman'
   OR title = 'Spider-Man: No Way Home'
   OR title = 'Top Gun: Maverick'
   OR title = 'Black Panther: Wakanda Forever'
   OR title = 'The Matrix'
   OR title = 'Inception'
   OR title = 'The Dark Knight';
