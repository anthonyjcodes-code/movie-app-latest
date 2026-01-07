-- Update movies with proper image URLs
UPDATE movies SET 
    imageUrl = CONCAT('/images/', LOWER(REPLACE(title, ' ', '')), 
    backdropUrl = CONCAT('/images/', LOWER(REPLACE(title, ' ', '')) 
WHERE imageUrl IS NULL OR imageUrl = '' OR backdropUrl = '';

-- Update specific movies with their actual images
UPDATE movies SET imageUrl = '/images/avatar.webp', backdropUrl = '/images/avatar.webp' WHERE title = 'Avatar: The Way of Water';
UPDATE movies SET imageUrl = '/images/fallout.webp', backdropUrl = '/images/fallout.webp' WHERE title = 'Fallout';
UPDATE movies SET imageUrl = '/images/predator.webp', backdropUrl = '/images/predator.webp' WHERE title = 'Predator';
UPDATE movies SET imageUrl = '/images/stranger things.webp', backdropUrl = '/images/stranger things.webp' WHERE title = 'Stranger Things';
UPDATE movies SET imageUrl = '/images/wicked For good.webp', backdropUrl = '/images/wicked For good.webp' WHERE title = 'Wicked: For Good';

-- Set default images for movies without specific images
UPDATE movies SET 
    imageUrl = CONCAT('/images/', LOWER(REPLACE(title, ' ', '')), 
    backdropUrl = CONCAT('/images/', LOWER(REPLACE(title, ' ', '')) 
WHERE title NOT IN ('Avatar: The Way of Water', 'Fallout', 'Predator', 'Stranger Things', 'Wicked: For Good', 'Dune: Part Two', 'Oppenheimer', 'Barbie', 'The Batman', 'Spider-Man: No Way Home', 'Top Gun: Maverick', 'Black Panther: Wakanda Forever', 'The Matrix', 'Inception', 'The Dark Knight')
    AND (imageUrl IS NULL OR imageUrl = '' OR backdropUrl = '' OR imageUrl = '/images/' OR backdropUrl = '/images/');
