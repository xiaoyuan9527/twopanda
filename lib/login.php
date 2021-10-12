<?php
    header("Access-Control-Allow-Origin: *");

    $user = $_POST['user'];
    $pwd = $_POST['pwd'];

    // php连接数据库
    // 连接mysql
    $link = mysqli_connect('127.0.0.1','root','root','users',3306);

        
    // if(!$link){
    //     die('连接失败'); 
    // }
    
    // 准备mysql
    $sql = "select * from userpwd where user='$user'";

    // 执行mysql
    $res = mysqli_query($link,$sql);

    //遍历获取sql数据
    $arr = [];
    while($row = mysqli_fetch_assoc($res)){
        $arr[] = $row;
    } 

    // 未注册
    if(!$arr){
        echo 1;
        //验证通过
    }else if($arr[0] && $arr[0]['pwd'] == $pwd){
        echo 2;
        //密码错误
    }else if($arr[0]){
        echo 3;
    }
    
?>