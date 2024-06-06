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
  let month = zales.salesPerMonth.map((datum) => {
    return datum.month;
  });

  zalestransaction = zales.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  console.log(res);

  const ctx = document.getElementById("myChart");

  linechart = new Chart(ctx, {
    type: "line",
    data: {
      labels: month,
      datasets: [
        {
          label: "Trans Total",
          data: zalestransaction,
          // backgroundColor: "blue",
          borderWidth: 1,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
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
  let month = att.salesPerMonth.map((datum) => {
    return datum.month;
  });

  atttransaction = att.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });
  alltransactions.push(...res.transactionByProduct);
});

fetchdata("x1367.json").then((res) => {
  guttentransaction = res;
  let month = guttentransaction.salesPerMonth.map((datum) => {
    return datum.month;
  });

  guttentransaction = guttentransaction.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  alltransactions.push(...res.transactionByProduct);
});

fetchdata("x1371.json").then((res) => {
  earltransaction = res;
  let month = earltransaction.salesPerMonth.map((datum) => {
    return datum.month;
  });

  earltransaction = earltransaction.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  alltransactions.push(...res.transactionByProduct);
});

fetchdata("x1380.json").then((res) => {
  librarytransaction = res;

  let month = librarytransaction.salesPerMonth.map((datum) => {
    return datum.month;
  });

  librarytransaction = librarytransaction.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  alltransactions.push(...res.transactionByProduct);
});

new gridjs.Grid({
  columns: ["Product", "Category", "Quantity", "Sales"],
  data: alltransactions,
  pagination: true,
  sort: true,
  search: true,
  className: {
    // td: 'my-td-class',
    pagination: "pagination",
  },
}).render(document.getElementById("wrapper"));

let selectElementMachine = document.getElementsByClassName("machine-filter");

const handleFilterChangeMachine = () => {
  machine = selectElementMachine[0].value;

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
          borderWidth: 1,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
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
let gutten;
let earl;
let library;
let mallmostselling;
let earlmostselling;
let guttenmostselling;
let librarymostselling;
let category;

let barchart2;

fetchdata("mall.json").then((res) => {
  mall = res;
  let category = mall.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  mallmostselling = mall.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });

  const ctx = document.getElementById("myyyChart");

  barchart2 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: category,
      datasets: [
        {
          label: "Total Produk",
          data: mallmostselling,
          borderWidth: 1,
          backgroundColor: [
            "rgb(94, 22, 117)",
            "rgb(238, 66, 102)",
            "rgb(255, 210, 63)",
            "rgb(51, 115, 87)",
          ],
          borderColor: "rgba(255, 99, 132, 1)",
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

fetchdata("gutten.json").then((res) => {
  gutten = res;
  let category = gutten.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  guttenmostselling = gutten.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });
});

fetchdata("earl.json").then((res) => {
  earl = res;
  let category = earl.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  earlmostselling = earl.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });
});

fetchdata("library.json").then((res) => {
  library = res;
  let category = library.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  librarymostselling = library.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });
});
let selectElementLocation = document.getElementsByClassName("location-filter");

const handleFilterChangeLocation = () => {
  let location = selectElementLocation[0].value;

  barchart2.data.datasets[0].data =
    location === "Brunswick Sq Mall"
      ? mallmostselling
      : location === "Earle Asphalt"
      ? earlmostselling
      : location === "EB Public Library"
      ? librarymostselling
      : location === "GuttenPlans"
      ? guttenmostselling
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  barchart2.update();
};

selectElementLocation[0].addEventListener("change", handleFilterChangeLocation);

("use strict");
// TOP 5 PRODUCT
let productCategory;
let productSalesChart;

fetch('top5product.json')
  .then(response => response.json())
  .then(data => {
    productCategory = data.category;
    let productName = data.product;
    let productSales = data.productSales;

    const ctx = document.getElementById("myyyyChart").getContext("2d");

    productSalesChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [productName],
        datasets: [
          {
            label: productCategory,
            data: [productSales],
            borderWidth: 1,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
          }
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
  })
  .catch(error => console.error('Error fetching the JSON file:', error));


// TYPE OF PAYMENT
let paymentTypes;
let paymentChart;

fetch('payment.json')
  .then(response => response.json())
  .then(data => {
    paymentTypes = data.typeOfPayment;
    
    let paymentTypeLabels = paymentTypes.map(datum => datum.PaymentType);
    let transactionPercentages = paymentTypes.map(datum => datum.TransactionPercentage);

    const ctx = document.getElementById("myyyyyChart").getContext("2d");

    paymentChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: paymentTypeLabels,
        datasets: [
          {
            label: 'Transaction Percentage',
            data: transactionPercentages,
            borderWidth: 1,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + "%";
              }
            }
          },
        },
      },
    });
  })
  .catch(error => console.error('Error fetching the JSON file:', error));
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

/*header & go-top-btn active ketika scroll*/
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

//validate form
function validateForm() {
  var nameInput = document.getElementById("nameInput");
  var emailInput = document.getElementById("emailInput");
  var vendzoneInput = document.getElementById("vendzoneInput");
  var phoneInput = document.getElementById("phoneInput");
  var messageInput = document.getElementById("messageInput");

  var name = nameInput.value;
  var email = emailInput.value;
  var vendzone = vendzoneInput.value;
  var phone = phoneInput.value;
  var message = messageInput.value;

  var nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  var phoneRegex = /^\d+$/; // Only digits
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format

  if (
    name === "" ||
    email === "" ||
    vendzone === "" ||
    phone === "" ||
    message === ""
  ) {
  } else if (!name.match(nameRegex)) {
  } else if (!phone.match(phoneRegex)) {
  } else if (!email.match(emailRegex)) {
  } else {
  }
}


const btnSubmit = document.getElementById("submitButton")
const btnClose = document.getElementById("closeButton")


btnSubmit.addEventListener("click",(e) => {
  e.preventDefault();
})  

btnClose.addEventListener("click",(e) => {
  e.preventDefault();
})  


const handleSubmit = () => {
  overlayElement = document.getElementsByClassName("over-lay")[0];
  overlayElement.style.display = "flex";
};


btnSubmit.addEventListener("click", handleSubmit);

const handleClose = () => {
  overlayElement = document.getElementsByClassName("over-lay")[0];
  overlayElement.style.display = "none";
};

btnClose.addEventListener("click", handleClose);

$(document).ready(function () {
  $(".service-list").slick({
    arrow: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 980, // tablet breakpoint
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // mobile breakpoint
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // mobile breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
