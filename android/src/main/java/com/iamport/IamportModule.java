package com.iamport;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.net.URISyntaxException;


@ReactModule(name = IamportModule.MODULE_NAME)
public class IamportModule extends ReactContextBaseJavaModule {
  public static final String MODULE_NAME = "Iamport";
  private final static String BANKPAY = "kftc-bankpay";
  private final static String ISP = "ispmobile";
  private final static String PACKAGE_ISP = "kvp.jjy.MispAndroid320";
  private final static String PACKAGE_BANKPAY = "com.kftc.bankpay.android";


  public IamportModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() { return MODULE_NAME; }

  @ReactMethod
  public void getAppUrl(String url, Promise promise) {
    try {
      Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
      promise.resolve(intent.getDataString());
    } catch (URISyntaxException e) {
      promise.reject("URISyntaxException", e.getMessage());
    }
  }

  @ReactMethod
  public void getMarketUrl(String url, Promise promise) {
    try {
      Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
      String packageName = getPackageName(intent);
      promise.resolve("market://details?id=" + packageName);
    } catch (URISyntaxException e) {
      promise.reject("URISyntaxException", e.getMessage());
    }
  }

  public String getPackageName(Intent intent) {
    String scheme = intent.getScheme();
    if (scheme.equalsIgnoreCase(ISP)) {
      return PACKAGE_ISP;
    }

    if (scheme.equalsIgnoreCase(BANKPAY)) {
      return PACKAGE_BANKPAY;
    }
    return intent.getPackage();
  }
}
