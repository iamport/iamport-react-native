

package com.iamport;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.iamport.webviewclient.IamportWebViewClient;
import com.iamport.webviewclient.NiceWebViewClient;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class IamportViewManager extends SimpleViewManager<IamportWebView> implements ActivityEventListener {
  public static final String REACT_CLASS = "IamportWebView";

  private Activity activity;
  private IamportPackage aPackage;
  private ThemedReactContext reactContext;
  public IamportWebView webView;
  private IamportWebViewClient webViewClient;
  private ReactApplicationContext applicationContext;

  public IamportViewManager(ReactApplicationContext applicationContext) {
    this.applicationContext = applicationContext;
    this.applicationContext.addActivityEventListener(this);
  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    /* 나이스 웹뷰 클라이언트에서 startActivityForResult를 호출한 경우에 한정 */
    if (requestCode == 4117) {
      /* 실시간 계좌이체 인증 후 후속처리 루틴 */
      webViewClient.bankPayPostProcess(requestCode, resultCode, data);
    }
  }

  @Override
  public void onNewIntent(Intent intent) {

  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public IamportWebView createViewInstance(ThemedReactContext context) {
    reactContext = context;

    activity = context.getCurrentActivity();

    webView = new IamportWebView(this, context);

    /* Load custom loading */
    webView.loadUrl("file:///android_asset/html/payment.html");

    /* Set web chrome client */
    webView.setWebChromeClient(new IamportWebChromeClient());

    return webView;
  }

  public void setPackage(IamportPackage aPackage) {
    this.aPackage = aPackage;
  }

  public IamportPackage getPackage() {
    return aPackage;
  }

  @ReactProp(name = "param")
  public void setParam(IamportWebView view, ReadableMap param) {
    /* Set web view client by pg provider */
    ReadableMap data = param.getMap("data");
    String pg = data.getString("pg");
    switch(pg) {
      case "nice": {
        webViewClient = new NiceWebViewClient(reactContext, activity, param);
        break;
      }
      default: {
        webViewClient = new IamportWebViewClient(reactContext, activity, param);
        break;
      }
    }
    view.setWebViewClient(webViewClient);
  }
}