fetch("data/grammys.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    grammys = json;
  });

$(window).on("load", () => {
  grammys.fields.forEach(element => {
    $("#category_types").append(new Option(element.field, element.field_id));
  });
});

$("#category_types").on("change", function() {
  $("#nominees_section").empty();
  field = getField(this.value);
  populateField(field);
});

function getField(field_id) {
  for (let i = 0; i < grammys.fields.length; i++) {
    if (grammys.fields[i].field_id == field_id) {
      return grammys.fields[i];
    }
  }
}

function populateField(field) {
  nominees_section = $("#nominees_section");
  nominees_section.append(`<h2>${field.field}</h2>`);

  if (field.description && field.description != "") {
    nominees_section.append(`<p>${field.description}</p>`);
  }

  field.categories.forEach(category => {
    let ul = document.createElement("ul");
    nominees_section.append(`<h3>${category.category_name}</h3>`);

    category.nominees.forEach((nominee, i) => {
      let li = document.createElement("li");
      if (i == category.winner_id) {
        $(`<h4 class="winner">${nominee.nominee}</h4><span>WINNER!</span>`).appendTo(li);
      } else {
        $(`<h4>${nominee.nominee}</h4>`).appendTo(li);
      }
      $(`<p>${nominee.artist}</p>`).appendTo(li);
      $(`<p>${nominee.info}</p>`).appendTo(li);

      ul.append(li);
      nominees_section.append(ul);
    })
  })
 }
