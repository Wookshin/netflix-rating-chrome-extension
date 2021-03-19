const rbs = document.querySelectorAll('input[name="rating"]');
for(const rb of rbs){
  rb.addEventListener("click", function () {
    console.log("in Extension");
    chrome.tabs.executeScript( {
      code : `var selectedValue="${rb.value}"; console.log("executeScript");`
    }, function() {
      chrome.tabs.executeScript({file: "content.js"});
    });
  });
}
