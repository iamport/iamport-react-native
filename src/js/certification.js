
window.addEventListener('DOMContentLoaded', function(event) {
  var IMP = window.IMP;

  document.addEventListener('message', function(e) {
    var params = JSON.parse(e.data);
    var userCode = params.userCode;
    var data = params.data;
    
    IMP.init(userCode);

    IMP.certification(data, function(response) {
      window.postMessage(JSON.stringify(response));
    });
  });
});