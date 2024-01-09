import {
  METHOD_FOR_CARD,
  METHOD_FOR_PHONE,
  METHOD_FOR_TRANS,
  METHOD_FOR_VBANK,
  METHODS,
  METHODS_FOR_INICIS,
  METHODS_FOR_KCP,
  METHODS_FOR_MOBILIANS,
  METHODS_FOR_UPLUS,
  QUOTAS,
} from './constants';

function getQuotas(pg: string) {
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

function getMethods(pg: string) {
  switch (pg) {
    case 'html5_inicis': {
      return METHODS_FOR_INICIS;
    }
    case 'kcp': {
      return METHODS_FOR_KCP;
    }
    case 'kcp_billing':
    case 'kakaopay':
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

export { getQuotas, getMethods };
