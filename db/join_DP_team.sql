
INSERT INTO devpool
    (team_name, team_desc, leader_id, user_id)
VALUES
    ($1, $2, $3, $4)
returning *;
