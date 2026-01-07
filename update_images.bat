@echo off
mysql -u root -proot cinema < update_remaining_movies.sql
echo Movies updated successfully!
pause
