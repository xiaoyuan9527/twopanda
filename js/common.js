function $$(tag) {
    return document.querySelector(tag);
}

let shopNum = $$("#header .tool .num>div");
let shopClick = $$("#header .tool .num");
let logoutClick = $$("#header .tool .logout")
let stateG = localStorage.getItem("state");
let cartG = localStorage.getItem("cart");
getnums();


//给予购物车小圆点
function getnums() {
    //判断有"state"的localstorage(判断登陆)
    if (stateG) {
        shopNum.classList.add("classDiv");
        //判断登出与否
        logoutClick.onmouseenter = function () {
            logoutClick.classList.add("cursorHand");
        }
        logoutClick.onclick = function () {
            localStorage.removeItem('state');
            location.reload();
        }
        // 判断有"cart"的loaclstorage
        if (cartG) {
            shopClick.onmouseenter = function () {
                shopClick.classList.add("cursorHand");
            }
            let nums = 0;
            JSON.parse(cartG).forEach(data => {
                nums += (data.num - 0);
            })
            shopNum.innerHTML = nums;
            if (nums > 0) {
                shopClick.onclick = function () {
                    window.location.href = './shop.html';
                }
            }
        }
        //未登陆情况
    }else{
        shopClick.onclick = function () {
            layer.msg('请先登陆');
        }
        logoutClick.onclick = function () {
            layer.msg('您还未登陆');
        }
    }
}