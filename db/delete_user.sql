DELETE FROM devpool
WHERE user_id IN
    (SELECT id
FROM users
WHERE username = $1);

DELETE FROM users
WHERE username = $1;