
package com.iamport;

import android.os.Build;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.facebook.react.uimanager.ThemedReactContext;

public class IamportWebView extends WebView {

  public IamportWebView(IamportViewManager viewManager, ThemedReactContext reactContext) {
    super(reactContext);

    WebSettings settings = this.getSettings();
    settings.setJavaScriptEnabled(true);
    settings.setBuiltInZoomControls(false);
    settings.setDomStorageEnabled(true);
    settings.setGeolocationEnabled(false);
    settings.setAllowFileAccess(true);
    settings.setAllowFileAccessFromFileURLs(true);
    settings.setAllowUniversalAccessFromFileURLs(true);
    settings.setLoadsImagesAutomatically(true);
    settings.setBlockNetworkImage(false);
    settings.setBlockNetworkLoads(false);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    }
  }
}