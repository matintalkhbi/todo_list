var btn_theme_switcher = document.getElementById("theme-switcher");
var body = document.querySelector("body");
var add_btn = document.getElementById("add-btn");
var todo_input = document.getElementById("addt");
var ul = document.querySelector(".todos");
var clear_button = document.querySelector(".clear");
var filter = document.querySelector(".filter");
var btn_filte = document.querySelector("#clear-completed");
function main() {
  //dragging mode

  ul.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("card") &&
      !e.target.classList.contains("dragging")
    ) {
      var draggingcard = document.querySelector(".dragging");
      var cards = [...ul.querySelectorAll(".card")];
      var currentpos = cards.indexOf(draggingcard);
      var newpos = cards.indexOf(e.target);
      // console.log('currentpos : ' + currentpos + '========= newpos : ' + newpos);
      if (currentpos > newpos) {
        ul.insertBefore(draggingcard, e.target);
      } else {
        ul.insertBefore(draggingcard, e.target.nextSibling);
      }
      var todos = JSON.parse(localStorage.getItem("todos"));
      var remove = todos.splice(currentpos, 1);
      todos.splice(newpos, 0, remove[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  //change_icon_switvher
  btn_theme_switcher.addEventListener("click", () => {
    var theme_img = btn_theme_switcher.appendChild[0];
    theme_img.setAttribute(
      "src",
      theme_img.getAttribute("src") == "./assets/images/icon-sun.svg"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg"
    );
  });
  //change_theme_background
  btn_theme_switcher.addEventListener("click", () => {
    body.classList.toggle("light");
  });
  //add_todo
  add_btn.addEventListener("click", () => {
    var item = todo_input.value.trim();
    if (item) {
      todo_input.value = "";
      var todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));

      var currentTodo = {
        item: item,
        iscompleted: false,
      };
      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      createelement([currentTodo]);
      console.log(currentTodo);
    }
  });
  //function for create card whit Enter
  todo_input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      add_btn.click();
    }
  });
  filter.addEventListener("click", (e) => {
    var id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });
  btn_filte.addEventListener("click", () => {
    var deleted_card = [];
    document.querySelectorAll(".card.checked").forEach((card) => {
      deleted_card.push(
        [...document.querySelectorAll(".todos .card")].indexOf(card)
      );
      console.log(card);
      card.classList.add("fall");
      card.addEventListener("animationend", () => {
        card.remove();
      });
    });
    console.log(deleted_card);
    removeallcompleted(deleted_card);

  });
  //createelement todo list html ,calss
  function createelement(todos) {
    if (!todos) {
      return null;
    }
    //p item
    var itemleft = document.querySelector("#items-left");
    //creat element card
    todos.forEach((todos) => {
      //createelement todo list html
      var card = document.createElement("li");
      var cdconrainer = document.createElement("div");
      var input_checkbox = document.createElement("input");
      var span_check = document.createElement("span");
      var p_item = document.createElement("p");
      var clear_button = document.createElement("button");
      var img = document.createElement("img");

      // add class list html tags
      card.classList.add("card");
      cdconrainer.classList.add("cb-container");
      input_checkbox.classList.add("cb-input");
      span_check.classList.add("check");
      p_item.classList.add("item");
      clear_button.classList.add("clear");
      // add set attribute
      card.setAttribute("draggable", true);
      input_checkbox.setAttribute("type", "checkbox");
      img.setAttribute("src", "./assets/images/icon-cross.svg");
      img.setAttribute("alt", "Clear it");
      // to otganize
      // clear_button.appendChild();
      cdconrainer.appendChild(input_checkbox);
      cdconrainer.appendChild(span_check);
      // clear_button.appendChild(img);
      card.appendChild(cdconrainer);
      card.appendChild(p_item);
      card.appendChild(clear_button);
      card.appendChild(img);
      clear_button.appendChild(img);
      document.querySelector(".todos").appendChild(card);
      p_item.textContent = todos.item;

      if (todos.iscompleted) {
        card.classList.add("checked");
        input_checkbox.setAttribute("checked", "checked");
      }
      //addEventListener of card
      card.addEventListener("dragstart", () => {
        card.classList.add("dragging");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });
      input_checkbox.addEventListener("click", (e) => {
        var currentcard = input_checkbox.parentElement.parentElement;
        var checked = input_checkbox.checked;
        currentcard_index = [
          ...document.querySelectorAll(".todos .card"),
        ].indexOf(currentcard);
        setisComplet(currentcard_index, checked);
        checked
          ? currentcard.classList.add("checked")
          : currentcard.classList.remove("checked");
        itemleft.textContent = document.querySelectorAll(
          ".todos .card:not(.checked)"
        ).length;
      });
      clear_button.addEventListener("click", (e) => {
        var currentcard = clear_button.parentElement;
        currentcard.classList.add("fall");
        var indexOf_currentcard = [
          ...document.querySelectorAll(".cb-container"),
        ].indexOf(currentcard);
        remove(indexOf_currentcard);
        currentcard.addEventListener("animationend", () => {
          setTimeout(() => {
            currentcard.remove;
            itemleft.textContent = document.querySelectorAll(
              ".todos .card:not(.checked)"
            ).length;
          }, 100);
        });
      });
    });
    itemleft.textContent = document.querySelectorAll(
      ".todos .card:not(.checked)"
    ).length;
  }
  function remove(index) {
    todos_list = JSON.parse(localStorage.getItem("todos"));
    todos_list.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos_list));
  }
  function setisComplet(index, isComplet) {
    todos_list = JSON.parse(localStorage.getItem("todos"));
    todos_list[index].iscompleted = isComplet;
    localStorage.setItem("todos", JSON.stringify(todos_list));
  }
  createelement(JSON.parse(localStorage.getItem("todos")));
  function removeallcompleted(indexs) {
    var todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter((todo, index) => {
      return !indexs.includes(index);
    
    });
    localStorage.setItem('todos' , JSON.stringify(todos))
    console.log(todos);
  }
}

document.addEventListener("DOMContentLoaded", main);
