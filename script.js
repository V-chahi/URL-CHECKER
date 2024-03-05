                        //Init global variables and adding event listener
var myurl = document.getElementById("url");
var result = document.getElementById("label_1");
var result_2 = document.getElementById("label_2");
var result_3 = document.getElementById("label_3");
myurl.addEventListener("input", checkstring);


//Calls the format and existence functions and displays result
async function checkstring() {
  result_2.innerHTML = "DOES NOT EXIST";
  result_3.innerHTML = "";
  if (checkurl_regex(myurl.value)) {
    result.innerHTML = "VALID STRING";
    const existence = await checkexistence();
    if (existence != -1) {
      if (existence[0] === 1) {
        result_2.innerHTML = "EXISTS";
        result_3.innerHTML =
          existence[1] === "" ? "Could not resovle" : existence[1];
      } 
      }
    } else if (result.textContent != "INVALID STRING") {
        result.innerHTML = "INVALID STRING";
  }
}

//Checks the format of the entered string if it matches with the url format using regular expression.
function checkurl_regex(string) {
  let exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(exp);
  if (string.match(regex)) {
    return true;
  } else {
    return false;
  }
}

//Adding TimeOut to fetch
const TimeOutFetch = (url, options) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetch(url, options));
    }, options.delay);
  });


//global var needed for throttling
var lastDate = 0;
//check if the url exists by sending it to server
async function checkexistence() {
  let newDate = new Date().getTime();
  if (newDate - lastDate >= 1000) {
    lastDate = newDate;
    const options = {
      method: "GET",
      headers: {},
      delay: 150
    };
    let url = "https://url-check-existence/?url=" + String(myurl);
    /*
  const response = await TimeOutFetch(url, options);
  if (!response.ok) {
    throw new Error(HTTP error! status: ${response.status});
  }
  const data = await response.json();
  */
    //Here the existence of the url and if it is a folder or a file should be extarcted from data variable
    return await RandomResult();

  } else {
    console.log("Cannot talk with server yet");
    return -1;
  }
}

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function RandomResult() {
  const Posibilities = {
    existence: [0, 1],
    file: [
      "HTML",
      "CSS",
      "JS",
      "PHP",
      "JSON",
      "ECE",
      "DHTML",
      "JSX",
      "DIRECTORY"
    ]
  };
  return [
    get_random(Posibilities["existence"]),
    get_random(Posibilities["file"])
  ];
}
