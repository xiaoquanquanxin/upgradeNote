

<h2>接收数据</h2>

<?php
header("Content-type: text/html; charset=utf-8");
$username = $_POST['username'];
//  $username = $_GET['username'];
echo $username;
if($username=='admin'){
    echo '登录成功' ;
}else{
    echo '登录失败';
}
?>

<br>
<br>get请求 $_GET
<br>post请求 $_POST
<br>接收任何请求 $_REQUEST

