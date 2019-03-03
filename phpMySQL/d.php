
<?php
header("Content-type: application/json; charset=utf-8");
$username = $_GET['username'];
if($username=='admin'){
    echo json_encode(array('msg'=>'登录成功','data'=>'注意:如果是json,那么所有的代码都应该放在 <?php?> 里面,并且得写的很纯,不能有别的多余的输出.','errorCode'=>'ok'));
}else{
    echo '登录失败';
}
?>