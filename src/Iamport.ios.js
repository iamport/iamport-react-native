import React, { Component } from "react";
import { WebView, Linking } from "react-native";
import PropTypes from "prop-types";
import isRequiredIf from "react-proptype-conditional-require";
import {
    CALLBACK_SUPPORT_PG_LIST,
    PG,
    PAY_METHOD,
    CURRENCY,
    ENGLISH_ALLOWED_PG,
    MARKET_URL_IOS
} from "../src/constants";

// code reference from https://github.com/facebook/react-native/issues/10865 @MrLoh
const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace("hasOwnProperty", "postMessage")
    }
    window.postMessage = patchedPostMessage
})})();`;

class IamportPaymentWebView extends Component {
    webview = null;

    state = { targetScheme: "" };

    getIMPInitScript = () => {
        const { iamportUserCode } = this.props;
        const script = `
            var IMP = window.IMP;
            IMP.init("${iamportUserCode}");
        `;

        return script;
    }

    getIMPRequestPayScript = () => {
        const { pg } = this.props.parameters;
        const isCallbackSupported = CALLBACK_SUPPORT_PG_LIST.includes(pg);

        const script = `
            var params = ${JSON.stringify(this.props.parameters)};
            function requestPay() {
                IMP.request_pay(params${isCallbackSupported ? `, function(rsp) {
                    window.postMessage(JSON.stringify(rsp));
                }` : ""});
            }
            requestPay();
        `;

        return script;
    }

    getHtmlSource = () => {
        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js" ></script>
                    <script type="text/javascript" src="https://service.iamport.kr/js/iamport.payment-1.1.5.js"></script>
                    <script type="text/javascript">
                        ${this.getIMPInitScript()}
                    </script>
                    <style>
                        .message {
                            text-align: center;
                            height: 100vh;
                        }
                        .message-text {
                            line-height: 100vh;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">
                        <span class="message-text">잠시만 기다려주세요.</span>
                    </div>
                    <script type="text/javascript">
                       ${this.getIMPRequestPayScript()}
                    </script>
                </body>
            </html>
        `;
        return html;
    }

    handlePostMessage = (e) => {
        const { onPaymentSuccess, onPaymentFailure } = this.props;
        const data = JSON.parse(e.nativeEvent.data);

        if (data.success) {
            onPaymentSuccess(data);
        } else {
            onPaymentFailure(data);
        }
    }

    handleJSInWebView = (script) => {
        if (this.webview) {
            this.webview.injectJavaScript(script);
        }
    }

    handleNavigationStateChange = (state) => {
        const { url } = state;

        // In case of NHN KCP
        if (url.includes("kcp")) {
            this.handleJSInWebView(`
                // In the case of 'ISP app' opening scenario when user uses NHN KCP as PG provider.
                function handleKcpIspApp() {
                    if (document.frm_mpi.submitISP) {
                        document.frm_mpi.submitISP(); // a function creates an url which contains data with ispapp:// appscheme
                    }
                    var ispUrl = document.frm_mpi.call_isp_frm.action; // get generated ispapp app url
                    if (ispUrl) {
                        window.location.replace(ispUrl); // opening the app while passing the payment data
                    }
                }
                handleKcpIspApp();
            `)
        }

        console.log("Webview URL", url);
        // Cutting out url scheme from url, and if it's not a standard http scheme,
        // we assume that it is an mobile app url. Therefore, set the value as a react state
        // to handle app opening properly if the targeted app is not installed in user's deivce.
        const scheme = url.split("://")[0];
        if (scheme !== "http" && scheme !== "https" && scheme !== "about:blank") {
            this.setState({ targetScheme: scheme });
        }
    }

    handleWebViewError = () => {
        const { targetScheme } = this.state;
        if (targetScheme) { // the value which is pointing the app that a user is trying to pay with.
            Linking.openURL(MARKET_URL_IOS[targetScheme]); // opening the app store
        }
        this.handleJSInWebView(`
            window.stop(); // stops window action
            window.history.back(); // redirects back to main PG main page view.
        `);
    }

    render() {
        return (
            <WebView
                ref={webview => this.webview = webview} // reference to component
                injectedJavaScript={patchPostMessageJsCode} // injects javascript code prior to loading start
                startInLoadingState={true} // loading UI
                source={{ html: this.getHtmlSource() }} // main html source to be rendered in webview
                onMessage={this.handlePostMessage} // the handler which takes webview's window.postMessage event
                onNavigationStateChange={this.handleNavigationStateChange} // tracks status of webview
                onError={this.handleWebViewError} // error handler
                { ...this.props } // passing other webview properties. Preset props can be overridden.
            />
        );
    }
};

IamportPaymentWebView.propTypes = {
    parameters: PropTypes.shape({
        pg: PropTypes.oneOf(PG),
        pay_method: PropTypes.oneOf(PAY_METHOD),
        escrow: PropTypes.bool,
        merchant_uid: PropTypes.string.isRequired,
        name: PropTypes.string,
        amount: PropTypes.number.isRequired,
        tax_free: PropTypes.number,
        currency: PropTypes.PropTypes.oneOf(CURRENCY),
        language: (props) => {
            const { pg, language } = props;
            if (language) {
                if (pg === "paypal") {
                    // refer to https://developer.paypal.com/docs/integration/direct/rest/country-codes/
                } else if (ENGLISH_ALLOWED_PG.includes(pg)) {
                    if (language !== "ko" && language !== "en") {
                        return new Error("올바르지 않은 언어설정입니다. 선택하신 pg사는 'ko' 또는 'en'옵션을 지원합니다.");
                    }
                } else {
                    if (language !== "ko") {
                        return new Error("올바르지 않은 언어설정입니다. 선택하신 pg사는 'ko'옵션을 지원합니다..");
                    }
                }
            }
        },
        buyer_name: PropTypes.string,
        buyer_tel: PropTypes.string.isRequired,
        buyer_email: PropTypes.string,
        buyer_addr: PropTypes.string,
        buyer_postcode: PropTypes.string,
        custom_data: PropTypes.object,
        notice_url: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        display: PropTypes.shape({
            card_quota: PropTypes.arrayOf(PropTypes.number)
        }),
        digital: isRequiredIf(PropTypes.bool, props => (props.pay_method === "phone")), // required if `pay_method` is `phone`
        vbank_due: PropTypes.string,
        m_redirect_url: isRequiredIf(PropTypes.string, (props) => {
            const { pg } = props;
            return pg !== "kakao" && pg !== "danal_tpay" && pg !== "mobilians"
        }),
        app_scheme: PropTypes.string.isRequired,
        biz_num: isRequiredIf(PropTypes.string, props => {
            const { pg, pay_method } = props;
            return pg === "danal_tpay" && pay_method === "vbank"
        }) // 다날-가상계좌 결제시 필수
    })
};

export default IamportPaymentWebView;