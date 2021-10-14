function $$(tag) {
    return document.querySelector(tag);
}

let shopNum = $$("#header .tool .num div");
let shopClick = $$("#header .tool .num");
let stateG = localStorage.getItem("state");
let cartG = localStorage.getItem("cart");

if (stateG) {
    shopNum.classList.add("classDiv");
    if (cartG) {
        let nums = 0;
        JSON.parse(cartG).forEach(data => {
            nums += (data.num - 0);
        })
        console.log(nums);
        shopNum.innerHTML = nums;
    }
    shopClick.onmouseenter = function () {
        shopClick.classList.add("cursorHand");
    }
    shopClick.onclick = function () {
        window.location.href = './shop.html';
    }
}