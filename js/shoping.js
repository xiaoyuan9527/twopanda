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
            <button>领券购买</button>
        </div>
    </div>
    <div class="right">

    </div>`;
    });

    //添加到指定页面位置中
    $$('#shoping').innerHTML = html;
}