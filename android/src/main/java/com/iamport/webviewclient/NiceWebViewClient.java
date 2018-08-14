
package com.iamport.webviewclient;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

public class NiceWebViewClient extends IamportWebViewClient {
    private final static String BANKPAY = "kftc-bankpay";
    private final static String ISP = "ispmobile"; // ISP 모바일(ispmobile://TID=nictest00m01011606281506341724)
    private final static String PACKAGE_ISP = "kvp.jjy.MispAndroid320";
    private final static String PACKAGE_BANKPAY = "com.kftc.bankpay.android";

    public NiceWebViewClient(ThemedReactContext reactContext, Activity activity, ReadableMap param) {
        super(reactContext, activity, param);
    }

    public void beforeStartNewActivity(String url, Intent intent) {
        if (url.startsWith(BANKPAY)) { // 실시간 계좌이채 예외처리

        }
    }

    public boolean isPaymentSchemeNotFound(String scheme) {
        if (ISP.equalsIgnoreCase(scheme)) {
            startNewActivity("market://details?id=" + PACKAGE_ISP);
            return true;
        } else if (BANKPAY.equalsIgnoreCase(scheme)) {
            startNewActivity("market://details?id=" + PACKAGE_BANKPAY);
            return true;
        }

        return false;
    }
}
