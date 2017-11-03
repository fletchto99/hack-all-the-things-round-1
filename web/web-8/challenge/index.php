<?php
$cookie_name = "I_am_the_cookie_monster";
$flag = 'flag{1_L0V3_C00K135}';
$cookie_value = base64_encode($flag);
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
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
        <h1>Hello World</h1>
    </div>
</body>
</html>
