
package com.iamport.webviewclient;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.os.Build;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

public class IamportWebViewClient extends WebViewClient {
  protected ThemedReactContext reactContext;
  protected Activity activity;

  private String userCode;
  private boolean isCallbackDefined;
  private ReadableMap data;
  protected String appScheme;
  private ReadableMap loading;

  private Boolean loadingFinished = false;

  private static final String DEFAULT_REDIRECT_URL = "https://service.iamport.kr";

  public IamportWebViewClient(ThemedReactContext reactContext, Activity activity, ReadableMap param) {
    this.reactContext = reactContext;
    this.activity = activity;
    
    userCode = param.getString("userCode");
    isCallbackDefined = param.getBoolean("isCallbackDefined");
    data = param.getMap("data");
    appScheme = data.getString("app_scheme");
    loading = param.getMap("loading");
  }

  @Override
  public boolean shouldOverrideUrlLoading(WebView view, String url) {
    Log.i("url", url);

    if (isUrlStartsWithRedirectUrl(url) || isUrlStartsWithProtocol(url)) return false;

    Intent intent = null;
    try {
      beforeStartNewActivity();

      intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME); // Intent URI 처리
      if (intent == null) return false;

      startNewActivity(intent.getDataString());
      return true;
    } catch(URISyntaxException e) {
      return false;
    } catch(ActivityNotFoundException e) { // PG사에서 호출하는 url에 package 정보가 없는 경우
      String scheme = intent.getScheme();
      if (isPaymentSchemeNotFound(scheme)) return true;

      String packageName = intent.getPackage();
      if (packageName == null) return false;

      startNewActivity("market://details?id=" + packageName);
      return true;
      }
  }

  /* WebView가 load되면 IMP.init, IMP.request_pay를 호출한다 */
  public void onPageFinished(WebView view, String url) {
    if (!loadingFinished && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) { // 무한루프 방지
      setCustomLoadingPage(view);

      view.evaluateJavascript("IMP.init('" + userCode + "');", null);
      view.evaluateJavascript("IMP.request_pay(" + toJSONObject(data) + ");", null);

      loadingFinished = true;
    }
  }

  /* 커스텀 로딩화면 셋팅 */
  private void setCustomLoadingPage(WebView view) {
    String image = loading.getString("image");
    String message = loading.getString("message");

    view.evaluateJavascript("document.getElementById('imp-rn-img').src = '" + image + "';", null);
    view.evaluateJavascript("document.getElementById('imp-rn-msg').innerText = '" + message + "';", null);
  }

  /* ReadableMap을 JSONObject로 변경 */
  private JSONObject toJSONObject(ReadableMap data) { // https://gist.github.com/mfmendiola/bb8397162df9f76681325ab9f705748b
    JSONObject jsonObject = new JSONObject();

    try {
      ReadableMapKeySetIterator iterator = data.keySetIterator();

      while (iterator.hasNextKey()) {
        String key = iterator.nextKey();
        ReadableType type = data.getType(key);

        switch (type) {
          case Boolean:
            jsonObject.put(key, data.getBoolean(key));
            break;
          case Number:
            jsonObject.put(key, data.getDouble(key));
            break;
          case String:
            jsonObject.put(key, data.getString(key));
            break;
        }
      }
    } catch(JSONException e) {

    }

    return jsonObject;
  }

  /* url이 https, http 또는 javascript로 시작하는지 체크 */
  private boolean isUrlStartsWithProtocol(String url) {
    if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("javascript:")) return true;
    return false;
  }

  /* url이 m_redirect_url로 시작하는지 체크 */
  private boolean isUrlStartsWithRedirectUrl(String url) {
    Boolean isRedirectUrlDefined = data.hasKey("m_redirect_url");
    String redirectUrl = DEFAULT_REDIRECT_URL;
    if (isRedirectUrlDefined) redirectUrl = data.getString("m_redirect_url");

    if (url.startsWith(redirectUrl)) { // 결제시도가 종료된 경우
      if (isCallbackDefined) { // 콜백이 설정되었으면, 리액트 네이티브로 event dispatch
        reactContext
          .getJSModule(RCTDeviceEventEmitter.class)
          .emit("message", url);
      }
      return true;
    }

    return false;
  }

  /* 나이스 정보통신 실시간 계좌이체 예외처리 등 */
  protected void beforeStartNewActivity() {

  }

  protected void startNewActivity(String parsingUri) {
    Uri uri = Uri.parse(parsingUri);
    Intent newIntent = new Intent(Intent.ACTION_VIEW, uri);

    activity.startActivity(newIntent);
  }

  /* ActivityNotFoundException에서 market 실행여부 확인 */
  protected boolean isPaymentSchemeNotFound(String scheme) {
    return false;
  }
}
