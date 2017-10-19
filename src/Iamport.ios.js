import React, { Component } from "react";
import { WebView } from "react-native";
import PropTypes from "prop-types";
import isRequiredIf from "react-proptype-conditional-require";

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
})})();`

class IamportPaymentWebView extends Component {
    getIMPInit = () => {
        const { iamportUserCode } = this.props;
        const script = `
            var IMP = window.IMP;
            IMP.init("${iamportUserCode}");
        `;

        return script;
    }

    getIMPRequestPay = () => {
        const { parameters } = this.props;
        const script = `
            var params = ${JSON.stringify(parameters)};
            IMP.request_pay(params, function(rsp) {
                window.postMessage(JSON.stringify(rsp));
            });
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
                        ${this.getIMPInit()}
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
                       ${this.getIMPRequestPay()}
                    </script>
                </body>
            </html>
        `;
        return html;
    }

    render() {
        return (
            <WebView
                ref={webview => { this.webview = webview; }}
                startInLoadingState={true}
                source={{
                    html: this.getHtmlSource()
                }}
                onMessage={(rsp) => console.log("postmessage", rsp)}
                { ...this.props }
            />
        );
    }
};

IamportPaymentWebView.propTypes = {
    parameters: PropTypes.shape({
        pg: PropTypes.oneOf([
            "html5_inicis",
            "inicis",
            "uplus",
            "nice",
            "jtnet",
            "kakao",
            "danal",
            "danal_tpay",
            "mobilians",
            "syrup",
            "payco",
            "paypal",
            "eximbay"
        ]),
        pay_method: PropTypes.oneOf([
            "card",
            "trans",
            "vbank",
            "phone",
            "samsung",
            "kpay",
            "cultureland",
            "smartculture",
            "happymoney",
            "booknlife"
        ]),
        escrow: PropTypes.bool,
        merchant_uid: PropTypes.string.isRequired,
        name: PropTypes.string,
        amount: PropTypes.number.isRequired,
        tax_free: PropTypes.number,
        currency: PropTypes.PropTypes.oneOf([
            "KRW",
            "USD",
            "EUR",
            "JPY"
        ]),
        language: (props) => {
            const { pg, language } = props;
            const allowedPg = [ "inicis", "html5_inicis", "uplus", "nice" ];

            if (pg === "paypal") {
                // refer to https://developer.paypal.com/docs/integration/direct/rest/country-codes/
            } else if (allowedPg.includes(pg)){
                if (language && language !== "ko" && language !== "en") {
                    return new Error(
                        "올바르지 않은 언어설정입니다. 선택하신 pg사는 'ko' 또는 'en'옵션을 지원합니다."
                    )
                }
            } else {
                if (language !== "ko") {
                    return new Error(
                        "올바르지 않은 언어설정입니다. 선택하신 pg사는 'ko'옵션을 지원합니다.."
                    )
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
        digital: isRequiredIf(PropTypes.bool, props => (props.pay_method === "phone")), // pay_method가 phone일 경우 필수
        vbank_due: PropTypes.string,
        m_redirect_url: PropTypes.string,
        app_scheme: PropTypes.string.isRequired,
        biz_num: isRequiredIf(PropTypes.string, props => {
            const { pg, pay_method } = props;
            return (pg === "danal" || pay_method === "vbank")
        }) // 다날-가상계좌 결제시 필수
    })
};

export default IamportPaymentWebView;