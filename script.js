

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
let product;
let categoryproduct;
let quantity;
let sales;


fetchdata("./json/x1364.json").then((res) => {
  zales = res;
  alltransactions.push(...res.transactionByProduct);
  let month = zales.salesPerMonth.map((datum) => {
    return datum.month;
  });

  zalestransaction = zales.salesPerMonth.map((datum) => {
    return datum.totalSales;
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
          backgroundColor: "hsl(275, 54%, 33%)",
          borderColor: "hsl(0, 0%, 90%)",
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

fetchdata("./json/x1366.json").then((res) => {
  att = res;
  let month = att.salesPerMonth.map((datum) => {
    return datum.month;
  });

  atttransaction = att.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });
  alltransactions.push(...res.transactionByProduct);
});

fetchdata("./json/x1367.json").then((res) => {
  guttentransaction = res;
  let month = guttentransaction.salesPerMonth.map((datum) => {
    return datum.month;
  });

  guttentransaction = guttentransaction.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  alltransactions.push(...res.transactionByProduct);
});

fetchdata("./json/x1371.json").then((res) => {
  earltransaction = res;
  let month = earltransaction.salesPerMonth.map((datum) => {
    return datum.month;
  });

  earltransaction = earltransaction.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  alltransactions.push(...res.transactionByProduct);
});

fetchdata("./json/x1380.json").then((res) => {
  librarytransaction = res;

  let month = librarytransaction.salesPerMonth.map((datum) => {
    return datum.month;
  });

  librarytransaction = librarytransaction.salesPerMonth.map((datum) => {
    return datum.totalSales;
  });

  alltransactions.push(...res.transactionByProduct);

  //TABLE
new gridjs.Grid({
  columns: ["Product", "Category", "Quantity", "Sales"],
  data: alltransactions ?? [],
  style: {
    table: {
      border: '3px solid #fff,'
    },
    th: {
      'background-color': 'rgba(30, 36, 112, 255)',
      color: '#fff',
      'border-bottom': '3px solid #ccc',
      'text-align': 'center'
    },
    td: {
      'text-align': 'center'
    }
  },
  pagination: true,
  sort: true,
  search: true,
  language: {
    search: {
      placeholder: 'Search a product...' 
    }
  },
  className: {
    pagination: "pagination",
  },
}).render(document.getElementById("wrapper"));

});



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

// REVENUE PER MACHINE
let machinerevenue;
let barchart;

fetchdata("./json/revenue.json").then((res) => {
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
          label: "Trans Total",
          data: machinerevenue,
          borderWidth: 1,
          backgroundColor: "purple",
          borderWidth: 1,
          backgroundColor: "hsl(275, 54%, 33%)",
          borderColor: "hsl(0, 0%, 90%)",
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

fetchdata("./json/mall.json").then((res) => {
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
          label: "Total Product",
          data: mallmostselling,
          borderWidth: 1,
          backgroundColor: "hsl(275, 54%, 33%)",

          borderColor: "hsl(0, 0%, 90%)",
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

fetchdata("./json/gutten.json").then((res) => {
  gutten = res;
  let category = gutten.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  guttenmostselling = gutten.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });
});

fetchdata("./json/earl.json").then((res) => {
  earl = res;
  let category = earl.mostSellingCategoryByLocation.map((datum) => {
    return datum.Category;
  });

  earlmostselling = earl.mostSellingCategoryByLocation.map((datum) => {
    return datum.TotalProductsSold;
  });
});

fetchdata("./json/library.json").then((res) => {
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

fetchdata("./json/top5product.json")
  .then((res) => {

    let product = res.top5Product.map((datum) => datum.product);
    let productSale = res.top5Product.map((datum) => datum.productSales);
    const ctx = document.getElementById("myyyyChart").getContext("2d");

    productSalesChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: product,
        datasets: [
          {
            label: 'Product Name',
            data: productSale,
            borderWidth: 1,
            backgroundColor: "hsl(275, 54%, 33%)",
            borderColor: "hsl(0, 0%, 90%)",
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
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));

// TYPE OF PAYMENT
let paymentTypes;
let paymentChart;

fetchdata("./json/payment.json")
  .then((res) => {
    paymentTypes = res.typeOfPayment;

    let paymentTypeLabels = paymentTypes.map((datum) => datum.PaymentType);
    let transactionPercentages = paymentTypes.map(
      (datum) => datum.TransactionPercentage
    );

    const ctx = document.getElementById("myyyyyChart").getContext("2d");

    paymentChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: paymentTypeLabels,
        datasets: [
          {
            label: "Transaction Percentage",
            data: transactionPercentages,
            borderWidth: 1,
            backgroundColor: [
              "hsl(0, 0%, 90%)", 
              "hsl(275, 54%, 33%)", 
            ],
            borderColor: [ 
              "hsl(275, 54%, 33%)",
              "hsl(0, 0%, 90%)",
            ]
          },
        ],
      },
      options: {
        responsive: true, 
      },
    });
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));
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

  var nameRegex = /^[A-Za-z\s]+$/; 
  var phoneRegex = /^\d+$/; 
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

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

const handleSubmit = () => {
  
    var nameInput = document.getElementById("nameInput");
    var emailInput = document.getElementById("emailInput");
    var vendzoneInput = document.getElementById("vendzoneInput");
    var phoneInput = document.getElementById("phoneInput");
    var messageInput = document.getElementById("messageInput");
    var popupMessageElement =
    document.getElementsByClassName("pop-up-message")[0];
    var popupImage = document.getElementById("pop-up-icon");

    var name = nameInput.value;
    var email = emailInput.value;
    var vendzone = vendzoneInput.value;
    var phone = phoneInput.value;
    var message = messageInput.value;

    var nameRegex = /^[A-Za-z\s]+$/; 
    var phoneRegex = /^\d+$/; 
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (
      name === "" ||
      email === "" ||
      vendzone === "" ||
      phone === "" ||
      message === ""
    ) {
      popupMessageElement.innerText = "Data tidak boleh kosong";
      popupImage.src = "assets/cross.gif"
    } else if (!name.match(nameRegex)) {
      popupMessageElement.innerText = "Inputan nama salah";
      popupImage.src = "assets/cross.gif"
    } else if (!phone.match(phoneRegex)) {
      popupMessageElement.innerText = "Inputan nomor telepon harus angka";
      popupImage.src = "assets/cross.gif"
    } else if (!email.match(emailRegex)) {
      popupMessageElement.innerText = "Inputan email salah";
      popupImage.src = "assets/cross.gif"
    } else if (vendzone === " ") {
      popupMessageElement.innerText = "Pilih vendzone terlebih dahulu";
      popupImage.src = "assets/cross.gif"
    }  else {
      popupMessageElement.innerText = "Data berhasil terkirim!";
      popupImage.src = "assets/check.gif"
    }
    overlayElement = document.getElementsByClassName("over-lay")[0];
    overlayElement.style.display = "flex";
};
const btnSubmit = document.getElementById("submitButton");
const btnClose = document.getElementById("closeButton");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
});

btnSubmit.addEventListener("click", handleSubmit);

const handleClose = () => {
  overlayElement = document.getElementsByClassName("over-lay")[0];
  overlayElement.style.display = "none";
};

btnClose.addEventListener("click", handleClose);



