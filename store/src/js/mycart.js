//切换结算/删除购物车状态
var toggle = document.getElementById("change");//获取切换按钮
var wind = document.getElementById("wind");//获取结算部分的div
var del = document.getElementById("del");//获取删除部分的div
var boxs = document.getElementsByClassName("cartmiddle-item");//获取所有图片(数组)
var lastchild = boxs[2]//得到装最后一个图片的box


var sum = 1;
change.onclick = function () {
    if (sum % 2 == 0) {
        toggle.innerHTML = "管理";
        wind.style.display = "flex";
        del.style.display = "none";
        lastchild.className = "cartmiddle-item alter1";
    } else {
        toggle.innerHTML = "完成";
        wind.style.display = "none";
        del.style.display = "flex";
        lastchild.className = "cartmiddle-item alter2";
    }
    sum++;
}