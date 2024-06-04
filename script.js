const fetchdata = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// SALES PER MONTH BY MACHINE
let zalestransaction;
let atttransaction;
let guttentransaction;
let earltransaction;
let librarytransaction;
let machine;
let zales;
let linechart;
let alltransactions = [];

fetchdata("x1364.json").then((res) => {
  zales = res;
  alltransactions.push(...res.transactionByProduct);
  let month = zales.transactionPerMonth.map((datum) => {
    return datum.MonthName;
  });

  zalestransaction = zales.transactionPerMonth.map((datum) => {
    return datum.TransactionCount;
  });

  const ctx = document.getElementById("myChart");

  linechart = new Chart(ctx, {
    type: "line",
    data: {
      labels: month,
      datasets: [
        {
          label: "LineTotal",
          data: zalestransaction,
          borderWidth: 1,
          backgroundColor: "blue",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

fetchdata("x1366.json").then((res) => {
  att = res;
  let month = att.transactionPerMonth.map((datum) => {
    return datum.MonthName;
  });

  atttransaction = att.transactionPerMonth.map((datum) => {
    return datum.TransactionCount;
  });
  alltransactions.push(...res.transactionByProduct);
});

fetchdata("x1367.json").then((res) => {
  guttentransaction = res;
  let month = guttentransaction.transactionPerMonth.map((datum) => {
    return datum.MonthName;
  });

  guttentransaction = guttentransaction.transactionPerMonth.map((datum) => {
    return datum.TransactionCount;
  });

  alltransactions.push(...res.transactionByProduct);
});

fetchdata("x1371.json").then((res) => {
  earltransaction = res;
  let month = earltransaction.transactionPerMonth.map((datum) => {
    return datum.MonthName;
  });

  earltransaction = earltransaction.transactionPerMonth.map((datum) => {
    return datum.TransactionCount;
  });

  alltransactions.push(...res.transactionByProduct);
});

fetchdata("x1380.json").then((res) => {
  librarytransaction = res;
  let month = librarytransaction.transactionPerMonth.map((datum) => {
    return datum.MonthName;
  });

  librarytransaction = librarytransaction.transactionPerMonth.map((datum) => {
    return datum.TransactionCount;
  });

  alltransactions.push(...res.transactionByProduct);
});

new gridjs.Grid({
  columns: ["Product", "Category", "Quantity", "Sales"],
  data: alltransactions,
  pagination: true,
  sort: true,
  search: true,
}).render(document.getElementById("wrapper"));

let selectElementMachine = document.getElementsByClassName("machine-filter");

const handleFilterChangeMachine = () => {
  machine = selectElementMachine[0].value;
  console.log(machine);

  linechart.data.datasets[0].data =
    machine === "BSQ Mall x1364 - Zales"
      ? zalestransaction
      : machine === "BSQ Mall x1366 - ATT"
      ? atttransaction
      : machine === "GuttenPlans x1367"
      ? guttentransaction
      : machine === "Earle Asphalt x1371"
      ? earltransaction
      : machine === "EB Public Library x1380"
      ? librarytransaction
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  linechart.update();
};

selectElementMachine[0].addEventListener("change", handleFilterChangeMachine);

const mergedTransactionByProduct = [];

// let dataObject = [
//   zales.transactionByProduct,
//   guttentransaction.transactionByProduct,
//   earltransaction.transactionByProduct,
//   atttransaction.transactionByProduct,
// ];

// console.log(dataObject);

// for (const dataObject of dataObjects) {
//   for (const product of dataObject.transactionByProduct) {
//     if (!uniqueProducts.has(product.Product)) {
//       uniqueProducts.add(product.Product);
//       mergedTransactionByProduct.push(product);
//     }
//   }

//   mergedSalesPerMonth.push(...dataObject.salesPerMonth);
// }

// alltransactions = mergedTransactionByProduct;

// console.log(alltransactions, "alltransactions");

console.log();

// REVENUE PER MACHINE

let machinerevenue;
let barchart;

fetchdata("revenue.json").then((res) => {
  revenue = res;
  let machine = revenue.revenuePerMachine.map((datum) => {
    return datum.Machine;
  });

  machinerevenue = revenue.revenuePerMachine.map((datum) => {
    return datum.Revenue;
  });

  const ctx = document.getElementById("myyChart").getContext("2d");

  barchart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: machine,
      datasets: [
        {
          label: "TransTotal",
          data: machinerevenue,
          borderWidth: 1,
          backgroundColor: "purple",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

// MOST SELLING CATEGORY PER MACHINE BY LOCATION

let mall;
let mallmostselling;
let earlmostselling;
let guttenmostselling;
let librarymostselling;
let category;

fetchdata("mall.json").then((res) => {
  mall = res;
  let category = mall.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  mallmostselling = mall.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });

  const ctx = document.getElementById("myyyChart");

  barchart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: category,
      datasets: [
        {
          label: "Food",
          data: mallmostselling.map((value, index) =>
            category[index] === "Food" ? value : 0
          ),
          borderWidth: 1,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Carbonated",
          data: mallmostselling.map((value, index) =>
            category[index] === "Carbonated" ? value : 0
          ),
          borderWidth: 1,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
        },
        {
          label: "Non Carbonated",
          data: mallmostselling.map((value, index) =>
            category[index] === "Non Carbonated" ? value : 0
          ),
          borderWidth: 1,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Water",
          data: mallmostselling.map((value, index) =>
            category[index] === "Water" ? value : 0
          ),
          borderWidth: 1,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

let selectElementLocation = document.querySelector("#location-filter");
console.log(selectElementLocation.value);

const handleFilterChangeLocation = () => {
  location = selectElementLocation[0].value;
  console.log(location);
  barchart.data.datasets[0].data =
    location === "Brunswick Sq Mall"
      ? mallmostselling
      : location === "Earle Asphalt"
      ? earlmostselling
      : location === "EB Public Library"
      ? librarymostselling
      : location === "GuttenPlans"
      ? guttenmostselling
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  barchart.update();
};

selectElementLocation[0].addEventListener("change", handleFilterChangeLocation);

("use strict");

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
