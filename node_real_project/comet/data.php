<?php
    //  header('Content-type:application/json;charset=utf-8');
    header('Cache-Control:max-age=0');
    $i= 11;
    while($i--){
        sleep(1);
        $radom = rand(1,999);
        echo $radom;
        echo '<br>';
        ob_flush();
        flush();
    }

?>