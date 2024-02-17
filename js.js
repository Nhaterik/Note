var createbtn = document.querySelector("#create");
var lists = document.querySelector(".list-courses");
var coursesApi = "http://localhost:3000/courses";

function start() {
  getI(handleGetApi);
  handlePostApi();
}
start();

function getI(callback) {
  fetch(coursesApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleGetApi(courses) {
  var courseArray = courses.map(function (course) {
    return ` <li class="course-${course.id}">
    <h3>${course.name}</h3>
    <p>${course.des}</p>
    <button class="btn" onclick="deleteCourse('${course.id}')">Delete</button>
    </li>
    `;
  });
  lists.innerHTML = courseArray.join("");
}

function deleteCourse(id) {
  var option = {
    method: "DELETE",

    header: {
      "Content-Type": "application/json",
    },
  };
  fetch(coursesApi + "/" + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      document.querySelector(".course-" + id).remove();
    });
}
function handlePostApi() {
  createbtn.onclick = function () {
    var name = document.querySelector(".name").value;
    var des = document.querySelector(".des").value;
    var form = {
      name: name,
      des: des,
    };
    postI(form, function () {
      getI(handleGetApi);
    });
  };
}
function postI(data, callback) {
  var option = {
    method: "POST",

    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(coursesApi, option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
