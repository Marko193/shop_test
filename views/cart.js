console.log('hello from cart file');

let cart = {};

document.querySelectorAll('.add-to-cart').forEach(function(element) {
    element.onclick = addToCart;
});

function addToCart() {
    let goodsId = this.dataset.goods_id;
    if (cart[goodsId]) {
        cart[goodsId]++;
    } else {
        cart[goodsId] = 1;
    }
    console.log(cart);
    ajaxGetGoodsInfo();
}

function ajaxGetGoodsInfo() {
    fetch('/get-goods-info', {
            method: 'POST',
            body: JSON.stringify({ key: Object.keys(cart) }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {

        }).then(function(body) {
            console.log(body);
        })
}


/*
function getData(obj) {
    var goodsId = obj.id;

}

console.log(goodsId);

/*
var myArr = [];

function pushData() {
    // get value from the input text
    var inputText = getData(obj);

    // append data to the array
    myArr.push(inputText);

    var pval = "";

    for (i = 0; i < myArr.length; i++) {
        pval = pval + myArr[i] + "<br/>";
    }

    // display array data
    //document.getElementById('pText').innerHTML = pval;
    console.log(pval);
}
*/