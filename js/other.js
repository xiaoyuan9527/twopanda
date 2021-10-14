window.onload = function () {
    //导航下边框样式
    let liobj = document.querySelectorAll("#main .change li");
    // console.log(liobj);
    liobj.forEach(function (v, i) {
        liobj[0].classList.add("liclass");
        v.onclick = function () {
            $$(".liclass").classList.remove("liclass");
            liobj[i].classList.add("liclass");
        }
    })

    ajax();

    function ajax() {
        axios.get("./goods1.json").then(data => {
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
                    <a href="javascript:;" class="price-value">加入购物车</a>
                    
                </div>
            </div>
        </div>`;
            })
            $$('#main .mainPronhub').innerHTML = html;
            let stateG = localStorage.getItem("state");
            let priceValue = document.querySelectorAll(".price-value");
            let shopNum = $$("#header .tool .num div");
            let shopClick = $$("#header .tool .num");
            // 给每个加入购物车添加点击事件
            priceValue.forEach(function (v, k) {
                //当点击时，判断是否加入localstroage
                v.onclick = function () {
                    if (stateG) {
                        layer.msg('已加入购物车');
                        //打开json文件，遍历找到被点击的部分，添加当前的数据
                        axios.get("./goods1.json").then(data => {
                            JSON.parse(data).forEach((v, kk) => {
                                if (kk == k) {
                                    addCart(v.id, v.name, v.src, v.price, 1);
                                    //再次取得num,追加到页面
                                    modLocal();
                                }
                            })
                        })
                    } else {
                        layer.msg('請登陸後再添加');
                    }
                }
            })
            //更新数据
            function modLocal() {
                let nums = 0;
                let numsGoods = localStorage.getItem('cart');
                numsGoods = JSON.parse(numsGoods);
                numsGoods.forEach(function (v, k) {
                    nums += v.num;
                })
                shopNum.innerHTML = nums;
                if (nums > 0) {
                    shopClick.onclick = function () {
                        window.location.href = './shop.html';
                    }
                }
            }
            //數據添加方法
            function addCart(id, name, src, price, num) {
                //1 获取购物车数据
                let cartGoods = localStorage.getItem('cart')
                //判断是否为空
                if (cartGoods) {
                    cartGoods = JSON.parse(cartGoods);
                    // console.log(cartGoods);
                    let exists = false;
                    //遍历判断多次点击时的情况，数量的变化规律
                    cartGoods.forEach(v => {
                        // console.log(v);
                        if (v.id == id) {
                            // 存在则增加数量
                            // num += v.num;
                            v.num = v.num - 0 + (num - 0)
                            exists = true;
                        }
                    })
                    // console.log(cartGoods);
                    // 4-1不存在则添加商品数据
                    if (!exists) {
                        cartGoods.push({
                            id,
                            name,
                            src,
                            price,
                            num
                        })
                    }
                    // 5 存入local
                    localStorage.setItem('cart', JSON.stringify(cartGoods))
                } else { // 4 为空
                    // 4-1 以数组的形式保存         {id:1,name:''}  [id,name,src]
                    let tmpGoods = {
                        id,
                        name,
                        src,
                        price,
                        num
                    };
                    let goodsArr = [tmpGoods];
                    // console.log(JSON.stringify(goodsArr));
                    // localStorage.setItem('cart', JSON.stringify(tmpGoods))
                    localStorage.setItem('cart', JSON.stringify(goodsArr))
                }
            }
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