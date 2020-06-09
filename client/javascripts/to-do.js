//jshint esversion: 6

let controller = function() {
  $.ajax({
    url: "http://localhost:8888/todos",
    method: "GET"
  }).done(res => {
    let pElem;
    //console.log(res.comments[0]._id + " " + res.comments[0].data)
    res.todo.forEach(comment => {
      pElem = $("<p>").html(todo.data);
      $(".comments").append(pElem);
    });
  });
  let addCommentFromInputBox = function() {
    //Semmy uses "$" to name variables that will contain jQuery objects
    let $new_todo, content;

    if ($(".comment-input input").val() !== "") {
      $new_todo = $("<p>").text($(".comment-input input").val());
      //$new_comment.hide();
      $(".comments").append($new_todo);
      //$new_comment.fadeIn();
      $(".comment-input input").val("");
      //log the list of paragraph elements
      localStorage.setItem("toDoList", $(".comments").html());
      console.log(localStorage.getitem("toDoList"));
    }
  };

  //add comment to db
  $.ajax({
    method: "POST",
    url: "http://localhost:8888/addtodo",
    data: {
      data: content
    }
  }).done(function(msg) {
    console.log("Data Saved: " + msg);
  });
};

$(".comment-input button").on("click", function(event) {
  addCommentFromInputBox();
});

$(".comment-input input").on("keypress", function(event) {
  if (event.keyCode === 13) {
    addCommentFromInputBox();
  }
});
let deletetodo = () => {
  //delete a todofrom db
  let content = $("#deleteOne").val();
  $.ajax({
    method: "POST",
    url: "http://localhost:8888/deletetodo/" + content
  }).done(function(msg) {
    console.log("todo deleted: " + msg);
  });

  window.location.reload();
};

let getodo = () => {
  //clear outDiv
  $("#outDiv").html("");
  let pElem;
  //retrieve todolist from db
  let content = $("#getOne").val();
  $.ajax({
    method: "GET",
    url: "http://localhost:8888/todo/" + content
  }).done(function(msg) {
    console.log("todo retrieved: " + msg.message.data);
    pElem = $("<p>").html("todo Retrieved: " + msg.message.data);
    $("#outDiv").append(pElem);
  });
  //window.location.reload();
};

let deleteAll = () => {
  //delete all comments from db
  localStorage.removeItem("commentsList");
  window.location.reload();
};

$(document).ready(() => {
  let btn01, btn02, btn03;
  //console.log("ready")
  //select the delete button
  btn03 = document.querySelectorAll("button")[3];
  btn03.addEventListener("click", deleteAll);
  btn02 = document.querySelectorAll("button")[2];
  btn02.addEventListener("click", deleteComment);
  btn01 = document.querySelectorAll("button")[1];
  btn01.addEventListener("click", getComment);
  controller();
});
