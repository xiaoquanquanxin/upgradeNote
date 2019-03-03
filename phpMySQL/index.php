<meta charset='utf-8'>
<?php
if(0){
echo '11111';
}else{
echo '000000';
}
?>

<?php
$a = '测试';
echo $a;
?>

<?php
$a = '<h3>变量带$</h3>';
echo $a;
if(isset($a)){
    echo '变量有块级作用域';
}
?>

<?php
$a = '<br>外面的变量外面的变量';
function test(){
    if(!isset($a)){
        global $a;
        echo $a;
    }else{
        echo '我可以';
    }
}
test()
?>


<h2>引入外链:</h2>
require_once:
<?php
require_once('a.php');
echo $GLOBALS['b'];
?>
 require_once报错会全错

<br>
include_once:
<?php
include_once('a.php');
echo $GLOBALS['b'];
?>
 include_once报错只是他错了


<h2>数组</h2>
<?php
$arrayTest = array('0'=>'苹果');
echo json_encode($arrayTest[0]);
?>



<h2>会话机制 session</h2>
<?php
session_start();
echo $_SESSION['views'];
?>



<h3>get表单</h3>
<form action='c.php' method='get'>
<input type='text' name='username'><br>
<input type='password' name='password'><br>
<button type='submit'>提交</button>
</form>


<h3>post表单</h3>
<form action='c.php' method='post'>
<input type='text' name='username'><br>
<input type='password' name='password'><br>
<button type='submit'>提交</button>
</form>


<h3>ajax表单</h3>
<form action='c.php' method='post'>
<input type='text' name='username' id='username'><br>
<input type='password' name='password' id='password'><br>
<button type='submit' id='submit'>提交</button>
</form>


<script src='jquery2.1.4.min.js'></script>
<script>
    $('#submit').on('click',function(e){
        $.ajax({
            type:'get',
            url:'d.php',
            dataType:'json',
            data:{
                username:$('#username').val()
            },
            success:function(data){
                alert(data);
                console.log(data)
            },
            error:function(err){
                console.log('接口跑通了就不会进来了,请求一个不存在的页面,报404啥的,才会进来;')
                console.log(err);
            }
        });
        e.preventDefault();
    });
</script>



