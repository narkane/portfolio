SELECT username
from users
    INNER JOIN devpool
    ON devpool.user_id = users.id;