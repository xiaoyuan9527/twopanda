//二维码付款按钮
let priceNums = document.querySelector(".price");
document.querySelector(".getMoney").onclick = function () {
    if ((priceNums.innerHTML - 0) != 0) {
        layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['260px', '350px'], //宽高
            content: '<h3>请扫描二维码付款</h3><br><img src="./images/个人博客.png" alt="">'
        });
    }

}
// //判断是否有数据
// let cartS = localStorage.getItem('cart');
// let tableS = document.querySelector(".cartTable");
// let footS = document.querySelector("#main .foot");
// let textS = document.querySelector("#main .change h3");

// if (!cartS) {
//     tableS.style.display = "none";
//     footS.style.display = "none";
//     textS.innerHTML = "您未选择商品，请跳转页面选择商品";
// } else {
//     tableS.style.display = "block";
//     footS.style.display = "block";
//     new Carts;
// }



class Carts {
    constructor() {
        this.getCartGoods();
        //获取按钮
        this.allChec = document.querySelectorAll(".checkAll");
        this.oneChec = document.querySelectorAll(".checkOne");
        //设置点击事件
        this.allChec[0].addEventListener('click', this.allCCFn.bind(this, 1))
        this.allChec[1].addEventListener("click", this.allCCFn.bind(this, 0));
        this.oneFn();
        this.$$("tbody").addEventListener("click", this.tbodyFn.bind(this));
    }

    tbodyFn(eve) {
        //判断点击的是哪个
        if (eve.target.className == 'add') {
            // console.log('add');
            this.addFn(eve.target);
        }

        if (eve.target.className == 'reduce') {
            // console.log('add');
            this.reduceFn(eve.target);
        }

        if (eve.target.className == 'delete') {
            // console.log('delete');
            this.deleteFn(eve.target);
        }
    }

    //删除功能
    deleteFn(tar) {
        // console.log(tar.innerHTML);
        let trObj = tar.parentNode.parentNode;
        let id = trObj.getAttribute("goods-id");

        trObj.remove();
        if ((trObj.children)[0].firstElementChild.checked) {
            this.totalNP(document.querySelectorAll(".check-one"))
        }
        this.modLocal(id);
    }

    //添加数量功能
    addFn(tar) {
        // console.log(tar);
        //获取当前节点上一节点
        let numObj = tar.previousElementSibling;
        //给予+1操作(先转成数字再+1)
        let num = numObj.value - 0 + 1;
        numObj.value = num;
        //获取其父亲节点
        let tdObj = tar.parentNode;

        //获取其价格变量
        let price = tdObj.previousElementSibling.innerHTML;
        // console.log(price);
        //给予对应数据多少的总价
        tdObj.nextElementSibling.innerHTML = (num * price).toFixed(2);
        let trObj = tdObj.parentNode;
        // console.log(trObj);
        (trObj.children)[0].firstElementChild.checked && this.totalNP();
        // 获取id
        let goodsId = trObj.getAttribute('goods-id');
        this.modLocal(goodsId, num)
    }

    totalNP(oneObj = "") {
        // 给予初始变量保存值
        this.oneChec = oneObj || this.oneChec;
        let totaNum = 0;
        let totaPrice = 0;
        // 遍历所有单选按钮
        this.oneChec.forEach(goods => {
            if (goods.checked) {
                //获取到最大的节点
                let goodsTrObj = goods.parentNode.parentNode;
                // console.log(goodsTrObj);
                //取得内部值，-0操作是转为数字型
                let num = goodsTrObj.querySelector(".count-input").value - 0;
                let price = goodsTrObj.querySelector(".subtotal").innerHTML - 0;
                // console.log(price);
                totaNum += num;
                totaPrice += price;
                console.log(totaNum, totaPrice);
            }
        })
        //将得到的数给予相对应的位置
        this.$$(".allnum").innerHTML = totaNum;
        this.$$(".price").innerHTML = totaPrice.toFixed(2);
    }

    //减少数量功能
    reduceFn(tar) {
        let numObj = tar.nextElementSibling;
        let num = numObj.value - 1;
        if (num == 0) num = 1;
        numObj.value = num;

        let tdObj = tar.parentNode;
        //获取其价格变量
        let price = tdObj.previousElementSibling.innerHTML;
        // console.log(price);
        //给予对应数据多少的总价
        tdObj.nextElementSibling.innerHTML = (num * price).toFixed(2);
        let trObj = tdObj.parentNode;
        // console.log(trObj);
        (trObj.children)[0].firstElementChild.checked && this.totalNP();

        let goodsId = trObj.getAttribute('goods-id');
        this.modLocal(goodsId, num)
    }

    // 更新local数量
    modLocal(goodsId, num = 0) {

        //  console.log(goodsId, num);
        let gd = localStorage.getItem('cart');
        // 无数据则清空
        if (!gd) return;

        gd = JSON.parse(gd);


        gd.forEach((goods, index) => {
            if (goodsId == goods.id) {
                if (num) goods.num = num; // 修改数量
                else { // 删除当前商品
                    gd.splice(index, 1)

                }
            }
        });
        // console.log(gd);
        // console.log(gd);
        // 更新到local中
        localStorage.setItem('cart', JSON.stringify(gd))

    }

    //全选按钮，eve.target调用其选中
    allCCFn(index, eve) {
        // console.log(index);
        let allStatus = eve.target.checked;
        //遍历给每个相同状态
        this.oneChec.forEach(check => {
            check.checked = allStatus;
        })
        //让另一个全选选中
        this.allChec[index].checked = allStatus
        this.totalNP();
    }

    //单个点击事件功能
    oneFn() {
        // console.log(this);

        let that = this;
        let checkNum = 0;
        let len = this.oneChec.length;
        this.oneChec.forEach((one, key) => {
            // console.log(one);
            //被选中一个，checkNum自加
            one.checked && checkNum++;
            //判断最后一个按钮选中
            one.onclick = function () {
                //判断当前被选中情况下是否满足达到最大长度
                if (this.checked) {
                    checkNum++;
                    checkNum == len && (that.allChec[0].checked = true);
                    checkNum == len && (that.allChec[1].checked = true);
                } else {
                    //自减，取消全选
                    checkNum--;
                    that.allChec[0].checked = false;
                    that.allChec[1].checked = false;
                }
                that.totalNP();
            }
        })
    }

    //数据的传递
    getCartGoods() {
        //从local拿到数据，给予参数**记住JOSN转换
        let cartG = localStorage.getItem("cart");
        // console.log(JSON.parse(cartG));
        let html = "";
        JSON.parse(cartG).forEach(data => {
            html += `<tr goods-id=${data.id}>
            <td>
                <input type="checkbox" class="checkOne">
            </td>
            <td class="max"><img src="${data.src}"><div class="nameNo">${data.name}</div></td>
            <td class="price-color">${data.price}</td>
            <td class="conter">
                <span class="reduce">-</span>
                <input class="count-input" type="text" value="${data.num}" />
                <span class="add">+</span></td>
            </td>
            <td class="price-color subtotal">${(data.price*data.num).toFixed(2)}</td>
            <td><a href="javascript:;" class="delete">删除</a></td>
        </tr>`;
        });
        //添加到指定页面位置中
        this.$$('#main tbody').innerHTML = html;
    }

    //封装document获取
    $$(tag) {
        return document.querySelector(tag);
    }

}

new Carts;