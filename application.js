var calculateitemTotal = function (element) {
  var itemQuant = Number(`${$(element).find(".quant input").val()}`);
  var itemPrice = Number(
    `${$(element).children(".price").text()}`.replace(/[^0-9.-]+/g, "")
  );

  let itemTotal = itemQuant * itemPrice;
  if (itemTotal >= 0) {
    $(element).children(".cost").html(`$${parseFloat(Math.round(itemTotal * 100) / 100).toFixed(2)}`);
  }
  return itemTotal;
};

var itemSum = function (accumlator, x) {
  return accumlator + x;
};

var newCartTotal = function () {
  var grandTotal = [];

  $("tbody tr").each(function (i, element) {
    let itemTotal = calculateitemTotal(element);
    grandTotal.push(itemTotal || 0);
  });

  if (grandTotal.length == 0) {
    $("#cartTotal").html(`$--.--`);
  } else {
    let totalCart = grandTotal.reduce(itemSum);
    $("#cartTotal").html(`$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`);
  }
};

$(document).ready(function () {
  newCartTotal();
  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    newCartTotal();
  });

  var timeout;
  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      newCartTotal();
    }, 250);
  });

  $("#newItem").on("submit", function (event) {
    event.preventDefault();
    let item = $(this).children(".item").val();
    let price = $(this).children(".price").val();

    $("tbody").append(`<tr> 
    <td class="item">${item}</td>
    <td class="price">$${price}</td>
    <td class="quant">
      <input type="number" min="0" value="1"/>
    </td>
    <td class="cost"></td>
    <td class="remove">
    <button class="btn btn-light btn-sm mb-1">Remove</button>
    </tr>
    `);
    newCartTotal();
    $(this).children(".item").val("");
    $(this).children(".price").val("");
  });
});
