
package com.iamport.webviewclient;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.net.URISyntaxException;

import android.app.Activity;
import android.content.Intent;
import android.content.ComponentName;
import android.util.Log;
import android.net.Uri;
import android.webkit.WebView;
import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

public class NiceWebViewClient extends IamportWebViewClient {
    private final static String BANKPAY = "kftc-bankpay";
    private final static int RESCODE = 1;
    private final static String NICE_BANK_URL = "https://web.nicepay.co.kr/smart/bank/payTrans.jsp";    // 계좌이체 거래 요청 URL(V2부터는 가변적일 수 있음)

    private String BANK_TID = "";
    private WebView webView;

    public NiceWebViewClient(ThemedReactContext reactContext, Activity activity, ReadableMap param) {
        super(reactContext, activity, param);
    }

    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        webView = view;

        Log.i("url", url);

        if (isPaymentOver(url)) { // 결제시도가 종료된 후, 콜백이 설정되었으면, 리액트 네이티브로 event dispatch
            reactContext
                .getJSModule(RCTDeviceEventEmitter.class)
                .emit("message", url);

            return false;
        }
        if (isUrlStartsWithProtocol(url)) return false;

        Intent intent = null;
        try {
            if (url.startsWith(BANKPAY)) {
                String reqParam = makeBankPayData(url);
                intent = new Intent(Intent.ACTION_MAIN);
                intent.setComponent(new ComponentName("com.kftc.bankpay.android", "com.kftc.bankpay.android.activity.MainActivity"));
                intent.putExtra("requestInfo", reqParam);
                activity.startActivityForResult(intent, RESCODE);

                return true;
            }

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

    private String makeBankPayData(String url) {
        BANK_TID = "";
        Uri uri = Uri.parse(url);
        Set<String> args = uri.getQueryParameterNames();

        StringBuilder ret_data = new StringBuilder();
        List<String> keys = Arrays.asList(new String[] {"firm_name", "amount", "serial_no", "approve_no", "receipt_yn", "user_key", "callbackparam2", ""});

        for (String arg: args) {
            if (keys.contains(arg)) {
                String value = uri.getQueryParameter(arg);
                if (arg.equals("user_key")) {
                    BANK_TID = value;
                }
                ret_data.append("&").append(arg).append("=").append(value);
            }
        }

        ret_data.append("&callbackparam1=" + "nothing");
        ret_data.append("&callbackparam3=" + "nothing");

        return ret_data.toString();
    }

    public void bankPayPostProcess(int requestCode, int resultCode, Intent data) {
        /* 실시간 계좌이체 인증 후 후속처리 루틴 */
        String resVal = data.getExtras().getString("bankpay_value");
        String resCode = data.getExtras().getString("bankpay_code");

        switch (resCode) {
          case "000": {
            try {
              String postData = "callbackparam2=" + BANK_TID + "&bankpay_code=" + URLEncoder.encode(resCode, "euc-kr") + "&bankpay_value=" + URLEncoder.encode(resVal, "euc-kr");
              webView.postUrl(NICE_BANK_URL, postData.getBytes());
            } catch (UnsupportedEncodingException e) {
              e.printStackTrace();
            }
            break;
          }
          case "091": {
            Log.e("iamport", "계좌이체를 취소하였습니다.");
            break;
          }
          case "060": {
            Log.e("iamport", "타임아웃");
            break;
          }
          case "050": {
            Log.e("iamport", "전자서명에 실패하였습니다.");
            break;
          }
          case "040": {
            Log.e("iamport", "OTP/보안카드 처리에 실패하였습니다.");
            break;
          }
          case "030": {
            Log.e("iamport", "인증모듈 초기화 오류가 발생하였습니다.");
            break;
          }
          default: {
            break;
          }
        }
    }
}
