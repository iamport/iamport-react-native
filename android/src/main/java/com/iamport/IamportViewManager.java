

package com.iamport;

import android.app.Activity;
import android.os.Build;
import android.webkit.CookieManager;
import android.view.ViewGroup.LayoutParams;
import android.webkit.WebViewClient;

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
        view.setWebViewClient(new NiceWebViewClient(reactContext, activity, param));
        break;
      }
      default: {
        view.setWebViewClient(new IamportWebViewClient(reactContext, activity, param));
        break;
      }
    }
  }
}