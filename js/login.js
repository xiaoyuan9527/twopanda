let login = $$(".but-login");

login.onclick = function () {
    // console.log(this);
    let userobj = $$('#userName');
    let pwdobj = $$('#pwdName');
    // console.log(userobj.value, pwdobj.value);
    if(userobj.value == ""){
        layer.msg('用户名不能为空');
    }else if(pwdobj.value == ""){
        layer.msg('密码不能为空');
    }else if (userobj.value != "" || pwdobj.value != "") {
        ajax(userobj.value, pwdobj.value);

    }
}

function ajax(user, pwd) {
    // 创建ajax
    let xhr = new XMLHttpRequest();
    // 设置请求
    xhr.open('post', './lib/login.php');
    // 发送请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // 构造参数
    let parson = 'user=' + user + '&' + 'pwd=' + pwd;
    // 发送请求
    xhr.send(parson);
    // 监听和接收返回值
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.response);
            if (xhr.response == 2) {
                layer.msg('登陆成功，请稍等');
                setTimeout(function () {
                    window.location.href = './index.html';
                }, 1000);
            } else if (xhr.response == 3) {
                layer.msg('用户名密码不匹配');
            } else if (xhr.response == 1) {
                layer.msg('账户未注册，正在跳转到注册页面');
                setTimeout(function () {
                    window.location.href = './register.html';
                }, 3000);
            }
        }
    }
}