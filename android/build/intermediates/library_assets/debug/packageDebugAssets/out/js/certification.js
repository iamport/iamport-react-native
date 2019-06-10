
window.addEventListener('DOMContentLoaded', function(event) {
  var IMP = window.IMP;

  document.addEventListener('message', function(e) {
    var params = JSON.parse(e.data);

    /* 로딩 화면 커스터마이징 */
    var loading = params.loading;
    var image = loading.image;
    document.getElementById('imp-rn-img').src = image;

    var message = loading.message;
    document.getElementById('imp-rn-msg').innerText = message;

    /* 본인인증 요청 */
    var userCode = params.userCode;
    var data = params.data;

    IMP.init(userCode);

    IMP.certification(data, function(response) {
      window.ReactNativeWebView.postMessage(JSON.stringify(response));
    });
  });
});