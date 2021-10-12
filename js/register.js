let user = $$("#userName");
let pwd = $$("#pwdName");
let pwdSure = $$("#pwdSure");
let showPwd = document.querySelectorAll(".showPwd");

showPwd.forEach(function (v, k) {
    v.classList.add("icon-yanjing_yincang_o");
    let i = 1;
    v.onclick = function () {
        i++;
        //判断是否空值，为空则不让点击
        if (v.nextElementSibling.value != "") {
            if (i % 2 == 0) {
                v.classList.remove("icon-yanjing_yincang_o");
                v.classList.add("icon-yanjing_xianshi_o");
                v.nextElementSibling.type = "text";

            } else {
                v.classList.remove("icon-yanjing_xianshi_o");
                v.classList.add("icon-yanjing_yincang_o");

                v.nextElementSibling.type = "password";
                // v.style.color = "green";

            }
        }
    }


})


// 正则表达式
let userReg = /^[\w\-\u4E00-\u9FA5]{4,20}$/;
let pwdReg1 = /\d/;
let pwdReg2 = /[a-z]/i;
let pwdReg3 = /[^\da-z]/i;

// 记录每一项的验证情况
let x = false,
    y = false,
    z = false

// 2 失去焦点验证用户名
user.onblur = function () {
    let userI = this.value;
    if (userReg.test(userI)) {
        this.nextElementSibling.innerHTML = '用户名合理';
        this.nextElementSibling.style.color = 'green';
        x = true;
    } else if (userI == "") {
        this.nextElementSibling.innerHTML = '用户名不能为空';
        this.nextElementSibling.style.color = 'red';
        x = false;
    } else {
        this.nextElementSibling.innerHTML = '用户名不合理';
        this.nextElementSibling.style.color = 'red';
        x = false;
    }
}

// 3 验证密码  
let pwdI = '';
pwd.onblur = function () {

    pwdI = this.value;
    if (pwdI == "") {
        this.nextElementSibling.innerHTML = '不能为空';
        y = false;
        return;
    } else if (pwdI.length > 20 || pwdI.length < 6) {
        this.nextElementSibling.innerHTML = '长度不符合要求!';
        y = false;
        return;
    }
    y = true;
    // 3-1 声明变量,保存匹配结果
    let a = 0,
        b = 0,
        c = 0;
    // 3-2 验证一种,则给abc任意一个赋值一次
    pwdReg1.test(pwdI) && (a = 1);
    pwdReg2.test(pwdI) && (b = 1);
    pwdReg3.test(pwdI) && (c = 1);

    // console.log(a + b + c);
    let sum = a + b + c;
    let pwdStr = '';
    sum == 1 && (pwdStr = '弱')
    sum == 2 && (pwdStr = '中')
    sum == 3 && (pwdStr = '强')
    // 将结果给p
    this.nextElementSibling.innerHTML = pwdStr;
    this.nextElementSibling.style.color = 'green';
    // 验证重复密码
    pwdSure.onblur();
}
// 重复密码
pwdSure.onblur = function () {
    var value = this.value;
    if (value == pwdI) {
        this.nextElementSibling.innerHTML = '密码一致';
        this.nextElementSibling.style.color = 'green';
        z = true;
    } else {
        this.nextElementSibling.innerHTML = '密码不一致';
        this.nextElementSibling.style.color = 'red';
        z = false;
    }
}

//点击注册事件
$$("#button-register").onclick = function () {
    if (x && y && z) {
        // console.log(x,y,z);

        // console.log(user.value, pwd.value);
        ajax(user.value, pwd.value);
    }

}

function ajax(user, pwd) {
    // 创建ajax
    let xhr = new XMLHttpRequest();
    // 设置请求
    xhr.open('post', './lib/register.php');
    // 发送请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // 构造参数
    let parson = 'user=' + user + '&' + 'pwd=' + pwd;
    // 发送请求
    xhr.send(parson);
    // 监听和接收返回值
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.response == 1) {
                layer.msg('注册成功，请稍等');
                setTimeout(function () {
                    window.location.href = './login.html';
                }, 2000)

            } else if (xhr.response == 2) {
                layer.msg('用户名重复');
                setTimeout(function () {
                    location.reload();
                }, 3000)
            }
        }
    }
}