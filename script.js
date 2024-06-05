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
      datasets: [{
        label: category,
        data: mallmostselling,
        borderWidth: 1,
        backgroundColor: [
          "rgb(94, 22, 117)",
          "rgb(238, 66, 102)",
          "rgb(255, 210, 63)",
          "rgb(51, 115, 87)",
        ],
        borderColor: "rgba(255, 99, 132, 1)",
      }] ,
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
let selectElementLocation = document.getElementsByClassName("location-filter");
console.log(selectElementLocation[0].value);

const handleFilterChangeLocation = () => {
  let location = selectElementLocation[0].value;
  console.log(guttenmostselling);
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


//validate form
function validateForm() {
  var nameInput = document.getElementById('nameInput');
  var emailInput = document.getElementById('emailInput');
  var vendzoneInput = document.getElementById('vendzoneInput');
  var phoneInput = document.getElementById('phoneInput');
  var messageInput = document.getElementById('messageInput');

  var name = nameInput.value;
  var email = emailInput.value;
  var vendzone = vendzoneInput.value;
  var phone = phoneInput.value;
  var message = messageInput.value;

  var nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  var phoneRegex = /^\d+$/; // Only digits
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format

  if (name === "" || email === "" || vendzone === "" || phone === "" || message === "") {
      Swal.fire({
          title: "Input Tidak Sesuai",
          text: "Input Tidak Boleh Kosong",
          icon: "error"
      });
  } else if (!name.match(nameRegex)) {
      Swal.fire({
          title: "Input Tidak Sesuai",
          text: "Nama Harus Huruf",
          icon: "error"
      });
  } else if (!phone.match(phoneRegex)) {
      Swal.fire({
          title: "Input Tidak Sesuai",
          text: "No HP harus angka",
          icon: "error"
      });
  } else if (!email.match(emailRegex)) {
      Swal.fire({
          title: "Input Tidak Sesuai",
          text: "Email tidak valid",
          icon: "error"
      });
  } else {
      Swal.fire({
          title: "Sukses",
          text: "Data Berhasil Dikirim",
          icon: "success"
      }).then(() => {
          // Reset form input values setelah SweetAlert ditutup
          nameInput.value = "";
          emailInput.value = "";
          vendzoneInput.value = "";
          phoneInput.value = "";
          messageInput.value = "";
      });
  }
}
