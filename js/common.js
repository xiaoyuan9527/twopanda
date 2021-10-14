function $$(tag) {
    return document.querySelector(tag);
}

let shopNum = $$("#header .tool .num div");
let shopClick = $$("#header .tool .num");
let stateG = localStorage.getItem("state");
let cartG = localStorage.getItem("cart");
getnums();

//给予购物车小圆点
function getnums() {
    //判断有"state"的localstorage(判断登陆)
    if (stateG) {
        shopNum.classList.add("classDiv");
        // 判断有"cart"的loaclstorage
        if (cartG) {
            let nums = 0;
            JSON.parse(cartG).forEach(data => {
                nums += (data.num - 0);
            })
            shopNum.innerHTML = nums;
        }
        //当登陆之后
        //给购物车跳转
        shopClick.onmouseenter = function () {
            shopClick.classList.add("cursorHand");
        }
        shopClick.onclick = function () {
            window.location.href = './shop.html';
        }
    }
}