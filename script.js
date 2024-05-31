const fetchdata = async(url)=>{
  const response = await fetch(url)
  return response.json()
}
let zalestransaction;
let atttransaction;
let machine;
let zales;
let linechart;
fetchdata("x1364.json").then((res)=>{
  zales = res
  let month = zales.transactionPerMonth.map((datum)=>{
    return datum.MonthName
  })

  zalestransaction = zales.transactionPerMonth.map((datum)=>{
    return datum.TransactionCount
  })

  const ctx = document.getElementById('myChart');

linechart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: month,
    datasets: [{
      label: 'LineTotal',
      data: zalestransaction,
      borderWidth: 1,
      backgroundColor	: 'blue'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

console.log(zales.transactionByCategory)
new gridjs.Grid({
  data: zales.transactionPerMonth,
  pagination: true,
  sort : true,
  search : true,
}).render(document.getElementById("wrapper"));

})

fetchdata("x1366.json").then((res)=>{
  att = res
  let month = att.transactionPerMonth.map((datum)=>{
    return datum.MonthName
  })

  atttransaction = att.transactionPerMonth.map((datum)=>{
    return datum.TransactionCount
  })
})

let selectElement = document.getElementsByClassName('machine-filter');
console.log(selectElement[0].value)

const handleFilterChange = () => {
  machine = selectElement[0].value
  linechart.data.datasets[0].data = machine === "BSQ Mall x1364 - Zales"? zalestransaction : machine === "BSQ Mall x1366 - ATT"? atttransaction : [1,2,3,4,5,6,7,8,9,10,11,12]
  linechart.update()
}
selectElement[0].addEventListener('change',handleFilterChange)



'use strict';

/*navbar*/

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const elemArr = [navCloseBtn, overlay, navOpenBtn];

for (let i = 0; i < elemArr.length; i++) {
  elemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

/*mengalihkan ketika meng-klik navbar apapun*/
const navbarLinks = document.querySelectorAll("[data-navbar-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}


/*header & go-top-btn activeketika scroll*/
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 400) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});



