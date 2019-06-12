package com.iamport;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;


public class IamportModule extends ReactContextBaseJavaModule {
  public IamportModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() { return "IamportModule"; }
}