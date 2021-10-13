window.onload = function () {
    let navLi = document.querySelectorAll("#nav li");
    let bannerUl = $$("#banner ul");
    // 遍历导航栏，给予点击按钮样式
    navLi.forEach(function (v, i) {
        navLi[1].classList.add("liHover");
        v.onclick = function () {
            $$(".liHover").classList.remove("liHover");
            navLi[i].classList.add("liHover");
        }
    })

    ajax();

    function ajax() {
        axios.get("./goods.json").then(data => {
            // console.log(JSON.parse(data));
            let html = "";
            JSON.parse(data).forEach((v, k) => {
                // console.log(v.src);
                html +=
                    `<div class="productList boxShadow">
            <div class="img">
                
                <img src="${v.src}" alt=""></a>
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
            let onclickGo = document.querySelectorAll("#main .productList .img");
            onclickGo.forEach(function (v, k) {
                v.onclick = function () {
                    // console.log(shop.firstElementChild.firstElementChild.src);

                    let shop = this.parentNode;
                    // console.log(shop);
                    let img = shop.firstElementChild.firstElementChild.src;
                    let name = shop.firstElementChild.nextElementSibling.firstElementChild
                        .innerHTML;
                    // console.log(name);
                    let price = shop.firstElementChild.nextElementSibling.firstElementChild
                        .nextElementSibling.nextElementSibling.firstElementChild
                        .firstElementChild.firstElementChild.nextElementSibling.innerHTML;
                    // console.log(price);
                    let num = shop.firstElementChild.nextElementSibling.firstElementChild
                        .nextElementSibling.nextElementSibling.firstElementChild
                        .firstElementChild.nextElementSibling.innerHTML;
                    // console.log(num);
                    addShop(img, name, price, num);
                    // 执行跳转
                    window.location.href = './shoping.html';
                }

                function addShop(img, name, price, num) {
                    //清空原有的localstore
                    localStorage.removeItem('shop');
                    // window.localStorage.removeItem('shop');

                    //1 获取购物车数据
                    localStorage.getItem("shop")
                    // 4-1 以数组的形式保存         {id:1,name:''}  [id,name,src]
                    let tmpGoods = {
                        img,
                        name,
                        price,
                        num
                    };
                    let goodsArr = [tmpGoods];
                    // console.log(JSON.stringify(goodsArr));
                    // localStorage.setItem('cart', JSON.stringify(tmpGoods))
                    localStorage.setItem('shop', JSON.stringify(goodsArr))
                }
            })

        })
    }
}