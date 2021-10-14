let navLi = document.querySelectorAll("#nav li");
// let bannerUl = $$("#banner ul");
// 遍历导航栏，给予点击按钮样式
navLi.forEach(function (v, i) {
    navLi[1].classList.add("liHover");
    v.onclick = function () {
        $$(".liHover").classList.remove("liHover");
        navLi[i].classList.add("liHover");
    }
})

getShopGoods();

//数据的传递
function getShopGoods() {
    //从local拿到数据，给予参数**记住JOSN转换
    let cartG = localStorage.getItem("shop");
    // console.log(JSON.parse(cartG));
    let html = "";
    JSON.parse(cartG).forEach(data => {
        html += `<div class="left flexA">
        <div class="img flex">
            <div class="small">
                <img src=${data.img} width="284" alt="">
                <div class="mask" id="mask"></div>
            </div>
            <div class="bigImg">
                <img src=${data.img} width="1136" alt="" class="bigImgMove">
            </div>
        </div>

        <div class="text">
            <h1 class="top">
                <img src="./images/shop.png" class="one">
                <img src="./images/shopwhere.png" class="two">
                ${data.name}
            </h1>
            <div class="cmd-price">
                <p class="original-price"><i> 原价¥${data.price*4}</i></p>
                <div class="last-price">
                    <span>券后价:</span>
                    <span class="price">
                        <i class="value-tag" style="font-size: 20px; font-style: normal;">¥</i>
                        ${data.price}<span class="digit" style="font-size: 28px;"></span>
                    </span>
                    <span class="coupon-info">80元券</span>
                    <span class="sale-num">${data.num}</span>
                </div>
            </div>
            <button class="btn">领劵购买</button>
        </div>
    </div>
    <div class="right">
        <h2 class="textH">————卖家————</h2>
        <img class="img" src="//img.alicdn.com/bao/uploaded/i1/72567254/O1CN0136ERVn23SNlKNzhQA_!!72567254.jpg_200x200q90.jpg_.webp" alt="">
        <div class="bottom">
            <div>
                描述
                <span></span>
            </div>
            <div>
                服务
                <span></span>
            </div>
            <div>
                物流
                <span></span>
            </div>
        </div>
    </div>`;
    });


    //添加到指定页面位置中
    $$('#shoping').innerHTML = html;
    
    let btns = $$("#shoping .btn");
    btns.onclick = function(){
        window.location.href = "https://blog.csdn.net/xiaoyuan9527";
    }    
    //评分
    let spanS = document.querySelectorAll("#shoping .right .bottom>div span");
    spanS.forEach(function (v, k) {
        //为了方便简单用随机数评分
        v.innerHTML = (Math.random() * (1 - 0) + 4).toFixed(1);
    })
    //随机数劵
    $$(".coupon-info").innerHTML = Math.ceil(Math.random() * 8) * 10 + "元劵";

}
//放大镜效果
class showImg {
    constructor() {
        this.boxObj = this.$$('.img');
        this.smallObj = this.$$('.small');
        this.maskObj = this.$$('.mask');
        this.bigObj = this.$$('.bigImg');
        this.bImg = this.$$('.bigImgMove');

        // 给small绑定鼠标移入,移出事件
        this.smallObj.addEventListener('mouseenter', this.enterFn.bind(this));
        this.smallObj.addEventListener('mouseleave', this.leaveFn.bind(this));

        // 绑定鼠标移动事件
        this.smallObj.addEventListener('mousemove', this.moveFn.bind(this));

    }
    // 移入
    enterFn() {
        // console.log(this);
        // 1 显示小黄块和大图
        this.maskObj.style.display = 'block';
        this.bigObj.style.display = 'block';
    }
    // 移出
    leaveFn() {
        this.maskObj.style.display = 'none';
        this.bigObj.style.display = 'none';
    }
    // 移动
    moveFn(event) {
        // console.log(event);
        // 1 获取鼠标的实时位置
        let mx = event.pageX;
        let my = event.pageY;
        // 2 获取box的坐标值
        let boxT = this.boxObj.offsetTop;
        let boxL = this.boxObj.offsetLeft;

        // 3 计算滑块的坐标
        let tmpX = mx - boxL - this.maskObj.offsetWidth / 2;
        let tmpY = my - boxT - this.maskObj.offsetHeight / 2;

        // 3-1 计算最大的坐标
        let maxL = this.smallObj.offsetWidth - this.maskObj.offsetWidth;
        let maxT = this.smallObj.offsetHeight - this.maskObj.offsetHeight;

        // 4 判断边界值
        if (tmpX < 0) tmpX = 0
        if (tmpY < 0) tmpY = 0;

        // 最大值设置
        if (tmpX > maxL) tmpX = maxL;
        if (tmpY > maxT) tmpY = maxT;

        this.maskObj.style.left = tmpX + 'px';
        this.maskObj.style.top = tmpY + 'px';

        // 计算大图在div中,移动的最大位置
        let bigL = this.bigObj.offsetWidth - this.bImg.offsetWidth;
        let bigT = this.bigObj.offsetHeight - this.bImg.offsetHeight;

        // 计算大图的实时位置
        let tmpBigT = tmpY / maxT * bigT;
        let tmpBigL = tmpX / maxL * bigL;

        // 实时位置设置给大图
        this.bImg.style.left = tmpBigL + 'px';
        this.bImg.style.top = tmpBigT + 'px';
    }

    $$(ele) {
        return document.querySelector(ele)
    }
}
new showImg;