//延时加载
window.onload = function () {

    let navLi = document.querySelectorAll("#nav li");
    let bannerUl = $$("#banner ul");
    // 遍历导航栏，给予点击按钮样式
    navLi.forEach(function (v, i) {
        navLi[0].classList.add("liHover");
        v.onclick = function () {
            $$(".liHover").classList.remove("liHover");
            navLi[i].classList.add("liHover");
        }
    })

    // 轮播
    let banner = $$("#banner .banner");
    let btnButton = $$("#banner .btn")
    let leftBtn = $$("#banner .btn .leftBtn");
    let rightBtn = $$("#banner .btn .rightBtn");
    let ul = $$("#banner .imgCheck ul");
    let liAll = document.querySelectorAll("#banner .imgCheck li");
    let ol = $$("#banner ol")
    let olLi = ol.children;
    let img = $$("#banner .imgCheck img");
    let index = 0;
    let timess = 0;
    let imgW = img.offsetWidth;

    for (let i = 0; i < liAll.length; i++) {
        // console.log(i);
        let newLi = document.createElement("li");
        // 追加到ol中
        ol.appendChild(newLi);
        //默认给予第一个颜色
        i == 0 && (newLi.style.background = "blue");
        //下方按键
        newLi.onclick = function () {
            classOn(i);
        }
    }
    auto();

    // 移入出现左右按钮
    banner.onmouseover = function () {
        btnButton.style.display = "block";
        clearInterval(timess);
    }
    //移出隐藏左右按钮
    banner.onmouseout = function () {
        btnButton.style.display = "none";
        auto();
    }
    //右箭头
    rightBtn.onclick = function () {
        index++;
        if (index == liAll.length) index = 0;
        classOn(index);
    }
    //左箭头
    leftBtn.onclick = function () {
        index--;
        if (index == -1) index = liAll.length - 1;
        classOn(index);
    }

    //自动调用
    function auto() {
        timess = setInterval(() => {
            //定时调用右箭头方法
            rightBtn.onclick();
        }, 3000)
    }
    //图片移动规律
    function classOn(i) {
        //图片移动
        let tmpx = imgW * i;
        ul.style.left = -tmpx + "px";
        //取消所有样式
        getColor(i);
    }
    //获取下边样式
    function getColor(i) {
        for (let j = 0; j < olLi.length; j++) {
            olLi[j].style.background = "#fff";
        }
        olLi[i].style.background = "blue";
    }

    //导入商品数据
    axios.get("./goods.json").then(data => {
        // console.log(JSON.parse(data));
        let html = "";
        JSON.parse(data).forEach((v, k) => {
            // console.log(v.src);
            html +=
                `<div class="productList boxShadow">
            <div class="img">
                <a href="shoping.html"><img src="${v.src}" alt=""></a>
            </div>
            <div class="text">
                <div class="name">${v.name}</div>
                <div class="where">
                    <span class="left">${v.where}</span>
                    <span class="right">包邮</span>
                </div>
                <div class="buy">
                    <div class="left">
                        <span class="price">
                            <span class="price-tag">￥</span>
                            <span class="price-strong">${v.price}</span>
                        </span>
                        <span class="sale-num">${v.nums}人已买</span>
                    </div>
                    <a href="javascript:;" class="price-value" onclick="checkFn();addCart(${v.id},'${v.name}','${v.src}','${v.price}',1)">加入购物车</a>
                    
                </div>
            </div>
        </div>`;
        })

        $$('#main .mainPronhub').innerHTML = html;

    })

    //提示文字，加入购物车
    //(有bug不知道如何绑定上述事件)

    // let goCart = document.querySelector(".mainPronhub");
    // goCart.onclick = function(){
    //     layer.msg('已加入购物车');
    // }  

    //小火箭回滚顶部
    $(function () {
        $(window).scroll(function () {
            // 获取滚动条距离顶部的位置
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 200) {
                // 显示
                $("#actGotop").fadeIn(1000);
            } else {
                $("#actGotop").fadeOut(1000);
            }
        })
        // 2. 给actGotop注册click
        //  2.1 让页面垂直方向的卷曲距离为0，效果为缓慢的
        $("#actGotop").click(function () {
            $("html,body").animate({
                scrollTop: 0
            }, 1000)
        })
    });
    


    // //注册用户
    // class Index {
    //     constructor() {
    //         // 给保存按钮绑定点击事件
    //         console.log(2222);
    //         $$('#login .signupbtn').addEventListener('click', this.saveClick.bind(this));
    //     }

    //     // 点击的回调函数
    //     saveClick() {
    //         console.log(1111);
    //         // 1 获取表单中内容
    //         let user = $$('#userName').value;
    //         let pwd = $$('#pwdName').value;
    //         let saveNum = 0;
    //         // 2 判断不能为空  
    //         if (!user) {
    //             saveNum++;
    //         }
    //         if (!pwd) {
    //             saveNum++;
    //         }

    //         if (saveNum == 0) {
    //             // 3 发送ajax请求
    //             axios.get('./lib/index.php', {
    //                 fn: 'add',
    //                 user,
    //                 pwd
    //             }).then(data => {
    //                 console.log(data);
    //                 if (data == 1) {
    //                     // location.reload();
    //                 }
    //             });
    //             // console.log("成功导入");
    //         }
    //     }
    // }
    // new Index;


    function $$(tag) {
        return document.querySelector(tag);
    }

    //推送至购物车


}