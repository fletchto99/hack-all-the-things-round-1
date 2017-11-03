<?php
$cookie_name = "permissions";
$perm = array(
    "guest", "admin"
);
$cookie_value = base64_encode(serialize($perm));
if(!isset($_COOKIE[$cookie_name])) {
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
}
?>
<html>
    <head>
        <style>
                body{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
        </style>
    </head>
<body>
    <div>
        <?php
            $x = base64_decode(
                    $_COOKIE[$cookie_name]
                );
            $array = unserialize($x);
            if (is_array($array) && $array['admin'] == 1) {
                echo '<h1>flag{N0W_1_4M_4N_4DM1N}</h1>';
            } else {
                if (isset($_POST['username']) || isset($_POST['password'])) {
                    echo '<h1 style="color: red;">Invalid username or password</h1>';
                }
                echo <<<EOF
        <form action="/" method='POST'>
            <label for="username">Username</label>
            <input type="text" id='username' name='username'><br>
            <label for="password">Password</label>
            <input type="password" id='password' name='password'><br>
            <button type="submit">Login</button>
        </form>
EOF;
            }
        ?>
    </div>
</body>
</html>
