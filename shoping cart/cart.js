let cartArr = [];
const cartbody = document.querySelector('#cartbody')
const prodName = document.querySelector('#prodName')
const prodPrice = document.querySelector('#prodPrice');
const prodSelect = document.querySelector('#prodSelect');
const img = document.querySelector('#img');
const addBtn = document.querySelector('#addBtn');



const list = document.querySelector('#list');
const save = document.querySelector('#save')


if (localStorage.getItem('cartbody')) {
    cartArr = JSON.parse(localStorage.getItem('cartbody'));
};


function reloadFunction() {
    cartbody.innerHTML = '';
    let count = 0;
    for (prod of cartArr) {
        let isBought = '';
        if (prod.isBought === true) {
            isBought = 'bought';
        }
        const listRow = `<tr class=${isBought}>
        <td>${prod.ProductName}</td>
        <td>${prod.price}</td>
        <td>${prod.productType}</td>
        <td><img src="${prod.img}" height="100" width="100"></td>
        <td>
        <button type='button' class="btn btn-danger btn-sm"><i class='fa-regular fa-trash-can btn-delete' data-id='${count}'></i></button>
        <button type='button' class="btn btn-light btn-sm btn-bought" data-id='${count}'>BOUGHT</button>
        <button type='button' class="btn btn-light btn-sm btn-restore" data-id='${count}'>RESTORE</button>
        </td>
        </tr>
        `
        count++
        cartbody.insertAdjacentHTML("beforeend", listRow)
    };
    localStorage.setItem('cartbody', JSON.stringify(cartArr));
};

addBtn.addEventListener('click', () => {
    if (prodName.value == '' || prodPrice.value == '' || prodSelect.value == '' || img.value == '') {
        alert('OI MATE!!!! you forgot to fill one of the fields. that a bit rude innit, to leave unfinished business!');
    } else {
        cartArr.push({
            ProductName: prodName.value,
            price: prodPrice.value,
            productType: prodSelect.value,
            img: img.value
        });
    };
    reloadFunction()
});

cartbody.addEventListener('click', (events) => {
    let myId;
    if (events.target.getAttribute('data-id')) {
        myId = events.target.getAttribute('data-id')
    };

    if (events.target.classList.contains('btn-delete')) {
        cartArr.splice(myId, 1)
    };

    if (events.target.classList.contains('btn-bought')) {
        cartArr[myId].isBought = true;
    };

    if (events.target.classList.contains('btn-restore')) {
        cartArr[myId].isBought = false;
    };
    reloadFunction()
});
reloadFunction()






