const CALLBACK_SUPPORT_PG_LIST = [ "kakao", "danal", "danal_tpay", "mobilians" ];
const PG = [ "html5_inicis", "inicis", "uplus", "kcp", "nice", "jtnet", "kakao", "danal", "danal_tpay", "mobilians", "syrup", "payco", "paypal", "eximbay", "naverco" ];
const PAY_METHOD = [ "card", "trans", "vbank", "phone", "samsung", "kpay", "cultureland", "smartculture", "happymoney", "booknlife" ];
const CURRENCY = [ "KRW", "USD", "EUR", "JPY" ];
const ENGLISH_ALLOWED_PG = [ "inicis", "html5_inicis", "uplus", "nice" ];
const MARKET_URL_IOS = {
    "lpayapp": "https://itunes.apple.com/kr/app/id1036098908",
    "shinhan-sr-ansimclick": "https://itunes.apple.com/kr/app/id572462317",
    "kpay": "https://itunes.apple.com/app/id911636268",
    "hdcardappcardansimclick": "https://itunes.apple.com/app/id702653088",
    "ispmobile": "https://itunes.apple.com/kr/app/id369125087",
    "kb-acp": "https://itunes.apple.com/kr/app/id695436326",
    "mpocket.online.ansimclick": "https://itunes.apple.com/kr/app/id535125356",
    "lotteappcard": "https://itunes.apple.com/kr/app/id688047200",
    "nhallonepayansimclick": "https://itunes.apple.com/kr/app/id1177889176",
    "cloudpay": "https://itunes.apple.com/kr/app/id847268987", // 하나1Q페이
    "citimobileapp": "https://itunes.apple.com/kr/app/id1179759666",
    "lguthepay": "https://itunes.apple.com/kr/app/id760098906" // 페이나우
}

export {
    CALLBACK_SUPPORT_PG_LIST,
    PG,
    PAY_METHOD,
    CURRENCY,
    ENGLISH_ALLOWED_PG,
    MARKET_URL_IOS
};