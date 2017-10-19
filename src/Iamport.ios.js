import React, { Component } from "react";
import { WebView } from "react-native";
import PropTypes from "prop-types";
import isRequiredIf from "react-proptype-conditional-require";

class IamportPaymentWebView extends Component {
    webview = null;

    getIMPInit = () => {
        const { iamportUserCode } = this.props;
        const script = `
            var IMP = window.IMP;
            IMP.init("${iamportUserCode}");
        `;

        return script;
    }

    getIMPRequestPay = () => {
        const { pg, pay_method, escrow, merchant_uid, name, amount, tax_free, currency, language, buyer_name, buyer_tel, buyer_addr, buyer_email, buyer_postcode, custom_data, notice_url, display, digital, vbank_due, m_redirect_url, app_scheme, biz_num } = this.props.parameters;
        const script = `
            IMP.request_pay({
                pg: "${pg}",
                pay_method: "${pay_method}",
                escrow: "${escrow}",
                merchant_uid: "${merchant_uid}",
                name: "${name}",
                amount: "${amount}",
                tax_free: "${tax_free}",
                currency: "${currency}",
                language: "${language}",
                buyer_name: "${buyer_name}",
                buyer_tel: "${buyer_tel}",
                buyer_email: "${buyer_email}",
                buyer_postcode: "${buyer_postcode}",
                custom_data: "${custom_data}",
                notice_url: "${notice_url}",
                display: "${display}",
                digital: "${digital}",
                vbank_due: "${vbank_due}",
                m_redirect_url: "${m_redirect_url}",
                app_scheme: "${app_scheme}",
                biz_num: "${biz_num}"
            }, function(rsp){
                window.postMessage(rsp);
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
                        ${this.getIMPRequestPay()}
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