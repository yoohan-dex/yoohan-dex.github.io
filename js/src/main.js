import config from "./config";
import axios from "axios";
let qrcodeUrl, loginInfo, gameover, haveSend;
if (window.courl) {
  qrcodeUrl = window.courl;
} else {
  qrcodeUrl =
    "http://tycm.dgxtx.com/vo/code.php?url=http://tycm.dgxtx.com/vo/share.php?str=b3Z2T053UFRzV3hkNUZmbGkyTDlaQ0pGdENEbw==&t=1498621990"; //二维码链接
}
if (window.countInit) {
  loginInfo = window.countInit;
} else {
  // a
  // loginInfo = {
  //   action_name: "index",
  //   openid: "ovvONwPTsWxd5Ffli2L9ZCJFtCDo",
  //   timeStamp: 1498621990,
  //   sign: "36af6280d2a300e867286d25529db83b9db26035"
  // };
  // b
  loginInfo = {"action_name":"index","openid":"ovvONwPTsWxd5Ffli2L9ZCJFtCDo1234","timeStamp":"1498621990","sign":"000b381f06c1b8df825769aefb928518bc8846a6"};
}
if (window.aflag) {
  gameover = !window.aflag;
} else {
  gameover = false;
}
// utils

const hasAccepted = res => res.data.code === 1;
const exec = url => data => cb => res => {
  if (res) {
    cb();
  } else {
    setTimeout(() => check(url)(data)(cb), 1000);
  }
};
const serializeJSON = data =>
  Object.keys(data)
    .map(
      keyName =>
        `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`
    )
    .join("&");

const check = url => data => cb =>
  post(url)(data).then(hasAccepted).then(exec(url)(data)(cb));

const post = url => data =>
  axios.post(config[url], serializeJSON(Object.assign({}, data, loginInfo)), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

const $ = ele => document.getElementById(ele);
const addClass = (ele, c) => ele.className += " " + c;
const display = ele => ele.style.display = "block";
const disappear = ele => ele.style.display = "none";

const enterPage = $("enter");
const acceptPage = $("accept");
const qrcodePage = $("qrcode");
const sendPage = $("send");
const nextPage = $("next");
const gamePage = $("game");
const messagePage = $("message");

const qrcodeItem = $("qrcode-item");
const btnSend = $("btn-send");
const btnAcc = $("btn-acc");
const flowerSend = $("flower-send");
const flowerAcc = $("flower-acc");
const flowerRemain = $("flower-remain");
const btnGame = $("btn-game-1");
const btnRule = $("btn-game-2");
const btnBack = $("back");
const rulePanel = $("rule-panel");
const heartsL = $("hearts-l");
const heartL = $("heart-l");
const btnUpload = $("upload");

// price
const ipadPage = $("ipad");
const card200Page = $('card200');
const hotwindPage = $('hotwind');
const miPowerPage = $('miPower');
const eggRollPage = $('eggRoll');

const selfilePage = $('selfile');
const dataLinePage = $('dataLine');
const usbFanPage = $('usbFan');
const beautyPage = $('beauty');
const playerCoinPage = $('playerCoin');

const endPage = $('gameend');
// index
  // disappear(acceptPage);
  // if (gameover) {
  //   alert('你的抽奖次数已经用完');
  // } 

// share
  disappear(enterPage);
  check('checkSending')()(() => {
    display(flowerAcc)
    addClass(btnAcc, 'down');
    haveSend = true;
  })

enterPage.addEventListener("click", () => {
  display(qrcodePage);
  console.log("display");
  qrcodeItem.style.backgroundImage = `linear-gradient(to right, #D43A50 0%,#D43A50 100%),url('${qrcodeUrl}')`;
  check("checkQrcode")()(() => display(sendPage));
});
// nextPage.addEventListener("click", () => display(sendPage));
const btnSendEvent = btnSend.addEventListener("click", () => {
  addClass(btnSend, "btn-send-g");
  btnSend.removeEventListener('click', btnSendEvent);
  const s = () => {
    display(heartsL);
    display(heartL);
    addClass(flowerSend, "sending");
    addClass(heartsL, "scale");
    addClass(heartL, "scale");
  };
  post("sendFlower")().then(s);
  check("checkAccept")()(
    () => {
      addClass(flowerRemain, "sending3");  
      setTimeout(() => display(gamePage), 3700);
  });
  // check("checkAccept")()(t);
});

btnGame.addEventListener("click", () => display(messagePage));
btnRule.addEventListener("click", () => {
  display(rulePanel);
  display(btnBack);
  disappear(btnGame);
  disappear(btnRule);
});
btnBack.addEventListener("click", () => {
  disappear(rulePanel);
  disappear(btnBack);
  display(btnGame);
  display(btnRule);
});
btnUpload.addEventListener("click", () => {
  post('upload')({
    truename: $('name').value,
    tel: $('phone').value,
    btype: haveSend ? 2 : 1,
  }).then(checkPrice);
});

const checkPrice = res =>{
  const {code, type, msg} = res.data;
  if (code === 1) {
    alert(msg);
    displayPrice(type);
    const priceCode = $('priceCode');
    display(priceCode);
    price.style.backgroundImage = `linear-gradient(to right, #D43A50 0%,#D43A50 100%),url('${res.data.priceCode}')`;
  } else if (code === 0) {
    alert(msg);
    display(endPage);
  } else if (code === -1) {
    alert(msg);
  }
}
const displayPrice = type => {
  switch (type) {
    case 1:
      display(ipadPage);
    case 2:
      display(card200Page);
    case 3:
      display(hotwindPage);
    case 4:
      display(miPowerPage);
    case 5:
      display(eggRollPage);
    case 6:
      display(selfilePage);
    case 7:
      display(dataLinePage);
    case 8:
      display(usbFanPage);
    case 9:
      display(beautyPage);
    case 10:
      display(playerCoinPage);
    default:
      display(endPage);
  }
}

// -------user B-----------

const btnAccEvent = btnAcc.addEventListener("click", () => {
  if (haveSend) {
    addClass(btnAcc, "btn-acc-g");
    addClass(flowerAcc, 'accepting2');
    post('acceptFlower')().then(() => {
      btnAcc.removeEventListener('click', btnAccEvent);
      setTimeout(() => {
        display(gamePage);
      }, 3700);
    })
  }
});

// axios({
//   method: 'post',
//   url: config[url],
//   data: Object.assign({}, data, loginInfo),
//   headers: {
//     'Content-Type' : 'application/x-www-form-urlencoded',
//   }
// })
// .then(hasAccepted)
// .then(exec(url)(data)(cb))
// .catch(res => alert(res))
