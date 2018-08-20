
export function getCurrentDate() {
  let date = new Date();	
  date.setDate(date.getDate() + 2); // 가상계좌 입금기한 날짜는 현재로부터 2일 후로 설정

  const year = date.getUTCFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}${month}${day}`;
}

export function getUserCode(pg) {
  switch(pg) {
    case 'kakao': return 'imp10391932';
    case 'paypal': return 'imp09350031';
    case 'mobilians': return 'imp60029475';
    case 'naverco': return 'imp41073887';
    case 'naverpay': return 'imp41073887';
    default: return 'imp19424728';
  }
}

export function getPgWarningMsg(pg) {
  if (pg === 'kakao') return '실제 승인이 이루어진 테스트 결제는 약 30분 후 자동 취소됩니다.';
  return '실제 승인이 이루어진 테스트 결제는 매일 자정(23:00 ~. 23:50분 사이) 자동 취소됩니다.';
}