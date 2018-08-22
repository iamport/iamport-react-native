
#import "IamportReactNative.h"
#import <React/RCTLinkingManager.h>

@implementation IamportReactNative

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // [IOS6] 세션 끊어지는 상황 방지 위한 쿠키 설정 (설정에서 사파리 쿠키 사용 설정도 필요)
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
    
    return YES;
}

RCT_EXPORT_MODULE() // To export a module named IamportReactNative

@end
  
