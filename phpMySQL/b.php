<meta charset='utf-8'>
<?php
session_start();
$_SESSION['views'] = '$_SESSION是系统的,会话机制需要开多个php';
echo $_SESSION['views'];
?>