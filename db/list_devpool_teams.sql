SELECT
    devpool.team_name,
    devpool.team_desc,
    username AS "team_lead"
from users
    INNER JOIN devpool
    ON devpool.leader_id = users.id;