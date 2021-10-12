<?php
    header("Access-Control-Allow-Origin: *");

    $user = $_POST['user'];
    $pwd = $_POST['pwd'];

    // php连接数据库
    // 连接mysql
    $link = mysqli_connect('127.0.0.1','root','root','users',3306);

    
    $sql1 = "select * from userpwd where user='$user'";
    $sql2 = "insert into userpwd values(null,'$user','$pwd')";

    $res1 = mysqli_query($link, $sql1);

    $arr = [];
    while ($row = mysqli_fetch_assoc($res1)) {
        $arr[] = $row;
    }
    
    if(!$arr){
        // echo 1;
        $res2 = mysqli_query($link, $sql2);
        if($res2){
            echo 1;
        } 
    }else{
        echo 2;
    }
?>