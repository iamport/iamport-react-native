package com.iamport;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

final class IamportWebChromeClient extends WebChromeClient {
  @Override
  public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) { // 컨펌 창 뜨려고 할때
    new AlertDialog.Builder(view.getContext())
    .setTitle(url + "에 삽입된 내용") // 컨펌 타이틀
    .setMessage(message) // 컨펌 메시지
    .setPositiveButton( // 확인버튼 눌렀을때
      android.R.string.ok,
      new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int which) {
          result.confirm();
        }
      }
    )
    .setNegativeButton( // 취소버튼 눌렀을때
      android.R.string.cancel,
      new DialogInterface.OnClickListener() {
      public void onClick(DialogInterface dialog, int which) {
          result.cancel();
        }
      }
    )
    .create()
    .show();

    return true;
  }
}
