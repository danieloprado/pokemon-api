# For Database
# /bin/sh -c "
#   while ! nc -z $DB_HOST $DB_PORT;
#   do
#     echo 'Waiting database';
#     sleep 1;
#   done;
#   echo 'Database ready!'!;
# "

npm rebuild sqlite3
mkdir -p .data
yarn dev