SELECT
    devpool.team_name,
    devpool.team_desc,
    username AS "Team Lead"
from users
    INNER JOIN devpool
    ON devpool.leader_id = users.id;