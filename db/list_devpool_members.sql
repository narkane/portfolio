
SELECT
    devpool.team_name,
    devpool.team_desc,
    users.username AS "team_user",
    devpool.user_id
from users
    INNER JOIN devpool
    ON devpool.user_id = users.id;