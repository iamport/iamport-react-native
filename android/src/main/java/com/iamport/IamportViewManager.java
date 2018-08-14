

package com.iamport;

import android.app.Activity;
import android.os.Build;
import android.webkit.CookieManager;
import android.view.ViewGroup.LayoutParams;

import com.iamport.webviewclient.IamportWebViewClient;
import com.iamport.webviewclient.NiceWebViewClient;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class IamportViewManager extends SimpleViewManager<IamportWebView> {
  public static final String REACT_CLASS = "IamportWebView";

  private Activity activity;
  private IamportPackage aPackage;

  private ThemedReactContext reactContext;

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public IamportWebView createViewInstance(ThemedReactContext context) {
    reactContext = context;
    activity = context.getCurrentActivity();

    IamportWebView webView = new IamportWebView(this, context);

    // UI설정?
    webView.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    // 쿠키설정
    CookieManager cookieManager = CookieManager.getInstance();
    cookieManager.setAcceptCookie(true);
    cookieManager.setAcceptFileSchemeCookies(true); // add default cookie support
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      cookieManager.setAcceptThirdPartyCookies(webView, true);
    }

    // 로딩 화면 오픈
    webView.loadUrl("file:///android_asset/html/payment.html");

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
    // PG사에 따라 WebViewClient 설정
    ReadableMap data = param.getMap("data");
    String pg = data.getString("pg");
    switch(pg) {
      case "nice": {
        view.setWebViewClient(new NiceWebViewClient(reactContext, activity, param));
        break;
      }
//      case "payco": {
//        break;
//      }
      default: {
        view.setWebViewClient(new IamportWebViewClient(reactContext, activity, param));
        break;
      }
    }
  }
}