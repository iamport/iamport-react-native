import {
  QUOTAS,
  METHODS,
  METHODS_FOR_KCP,
  METHODS_FOR_UPLUS,
  METHODS_FOR_INICIS,
  METHODS_FOR_MOBILIANS,
  METHOD_FOR_CARD,
  METHOD_FOR_PHONE,
  METHOD_FOR_VBANK,
  METHOD_FOR_TRANS,
} from './constants';

export function getQuotas(pg) {
  switch (pg) {
    case 'html5_inicis':
    case 'kcp': {
      return QUOTAS.concat([
        {
          value: 2,
          label: '2개월',
        },
        {
          value: 3,
          label: '3개월',
        },
        {
          value: 4,
          label: '4개월',
        },
        {
          value: 5,
          label: '5개월',
        },
        {
          value: 6,
          label: '6개월',
        },
      ]);
    }
    default:
      return QUOTAS;
  }
}

export function getMethods(pg) {
  switch (pg) {
    case 'html5_inicis': {
      return METHODS_FOR_INICIS;
    }
    case 'kcp': {
      return METHODS_FOR_KCP;
    }
    case 'kcp_billing':
    case 'kakaopay':
    case 'kakao':
    case 'paypal':
    case 'payco': 
    case 'smilepay':
    case 'chai':
    case 'alipay': {
      return METHOD_FOR_CARD;
    }
    case 'uplus': {
      return METHODS_FOR_UPLUS;
    }
    case 'danal': {
      return METHOD_FOR_PHONE;
    }
    case 'mobilians': {
      return METHODS_FOR_MOBILIANS;
    }
    case 'settle': {
      return METHOD_FOR_VBANK;
    }
    case 'payple': {
      return METHOD_FOR_TRANS;
    }
    default:
      return METHODS;
  }
}

export function getUserCode(pg, tierCode, type = 'payment') {
  if (tierCode) {
    return 'imp91623210';
  }
  if (type === 'certification') {
    return 'imp10391932';
  }

  switch (pg) {
    case 'kakao':
      return 'imp10391932';
    case 'paypal':
      return 'imp09350031';
    case 'mobilians':
      return 'imp60029475';
    case 'naverco':
    case 'naverpay':
      return 'imp41073887';
    case 'smilepay':
      return 'imp49241793';
    case 'chai':
      return 'imp37739582';
    case 'alipay':
      return 'imp87936124';
    case 'payple':
      return 'imp42284830';
    default:
      return 'imp19424728';
  }
}