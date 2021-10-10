const ticketsForm = document.querySelector('.tickets__form');
const totalPriceInfo = document.querySelector('.amount-form__sum');
const permanentInput = document.getElementById('permanent');
const temporaryInput = document.getElementById('temporary');
const combinedInput = document.getElementById('combined');
const inputBasic = document.getElementById('basic');
const inputSenior = document.getElementById('senior');

const popupElement = document.querySelector('.popup');
const popupForm = document.querySelector('.popup-form');
const popupOverlay = document.querySelector('.overlay');
const dateWrapper = document.querySelector('.details-form__item--date');
const timeWrapper = document.querySelector('.details-form__item--time');

const inputDate = document.getElementById('date');
const selectTime = document.getElementById('time');
const inputName = document.getElementById('name');
const inputMail = document.getElementById('mail');
const inputPhone = document.getElementById('phone');
const selectType = document.querySelector('.details-form__select');
const popupInputBasic = document.getElementById('popup-basic');
const popupInputSenior = document.getElementById('popup-senior');

const userNameRequirements = document.querySelector('.username-requirements');
const mailRequirements = document.querySelector('.mail-requirements');
const phoneRequirements = document.querySelector('.phone-requirements');

const weekdayInfo = document.querySelector('.overview__date--weekday');
const monthInfo = document.querySelector('.overview__date--month');
const dayInfo = document.querySelector('.overview__date--day');
const timeInfo = document.querySelector('.overview__time');
const ticketTypeInfo = document.querySelector('.overview__ticket-type');
const popupBasicTypePrice1 = document.getElementById('basic-type-price1');
const popupSeniorTypePrice1 = document.getElementById('senior-type-price1');
const popupBasicTypePrice2 = document.getElementById('basic-type-price2');
const popupSeniorTypePrice2 = document.getElementById('senior-type-price2');
const popupBasicAmountInfo = document.querySelector('.total__basic-amount');
const popupSeniorAmountInfo = document.querySelector('.total__senior-amount');
const popupTotalBasicSumInfo = document.querySelector('.total__basic-sum');
const popupTotalSeniorSumInfo = document.querySelector('.total__senior-sum');
const popupTotalPriceInfo = document.querySelector('.price__total-sum');

const getCheckedType = () => {
  const checked = [permanentInput, temporaryInput, combinedInput].find((item) => item.checked);
  return checked.value;
};

const prices = {
  permanent: 20,
  temporary: 25,
  combined: 40,
};

let curType = sessionStorage.getItem('curType') ?? getCheckedType();

if (sessionStorage.getItem('curType')) {
  document.getElementById(curType).checked = true;
}

let basicAmount = sessionStorage.getItem('basicAmount') ?? 1;
let seniorAmount = sessionStorage.getItem('seniorAmount') ?? 1;
let curTotal = sessionStorage.getItem('curTotal') ?? 30;

let popupSelectedType = curType;
let popupBasicAmount = basicAmount;
let popupSeniorAmount = seniorAmount;
let popupCurTotal = curTotal;

inputBasic.value = basicAmount;
inputSenior.value = seniorAmount;
totalPriceInfo.textContent = `${curTotal}`;

const getTotalPrice = (type) => {
  const basicTotalPrice = prices[type] * basicAmount;
  const seniorTotalPrice = (prices[type] / 2) * seniorAmount;

  return basicTotalPrice + seniorTotalPrice;
};

const getPopupTotalPrice = (type) => {
  const popupBasicTotalPrice = prices[type] * popupBasicAmount;
  const popupSeniorTotalPrice = (prices[type] / 2) * popupSeniorAmount;

  return popupBasicTotalPrice + popupSeniorTotalPrice;
};

inputBasic.addEventListener('change', (e) => { 
  basicAmount = e.target.value;  
  popupBasicAmount = e.target.value;
  curTotal = getTotalPrice(curType);
  popupCurTotal = getTotalPrice(curType);

  sessionStorage.setItem('basicAmount', basicAmount);
  sessionStorage.setItem('curTotal', curTotal);
  
  totalPriceInfo.textContent = `${curTotal}`;
});

inputSenior.addEventListener('change', (e) => {
  seniorAmount = e.target.value;
  popupSeniorAmount = e.target.value;
  curTotal = getTotalPrice(curType);  
  popupCurTotal = getTotalPrice(curType);

  sessionStorage.setItem('seniorAmount', seniorAmount);
  sessionStorage.setItem('curTotal', curTotal);

  totalPriceInfo.textContent = `${curTotal}`;
});

[permanentInput, temporaryInput, combinedInput].forEach(
  (item) => item.addEventListener('click', (e) => {
    curType = e.target.value;
    curTotal = getTotalPrice(curType);

    sessionStorage.setItem('curType', curType);
    sessionStorage.setItem('curTotal', curTotal);

    totalPriceInfo.textContent = `${getTotalPrice(curType)}`;
  })
);

ticketsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  document.querySelector(`option[value=${curType}]`).selected = true; 

  popupElement.classList.remove('popup--closed');
  popupElement.classList.add('popup--opened');
  popupOverlay.classList.remove('overlay--closed');
  popupOverlay.classList.add('overlay--opened');

  ticketTypeInfo.textContent = `${selectType.options[selectType.selectedIndex].text}`;
  popupInputBasic.value = basicAmount;
  popupInputSenior.value = seniorAmount;  
  popupBasicAmountInfo.textContent = `${basicAmount}`;
  popupBasicTypePrice1.textContent = `${prices[curType]}`;
  popupBasicTypePrice2.textContent = `${prices[curType]}`;
  popupSeniorAmountInfo.textContent = `${seniorAmount}`;
  popupSeniorTypePrice1.textContent = `${prices[curType] /2}`;
  popupSeniorTypePrice2.textContent = `${prices[curType] /2}`;
  popupTotalBasicSumInfo.textContent = `${prices[curType] * basicAmount}`;
  popupTotalSeniorSumInfo.textContent = `${(prices[curType] /2) * seniorAmount}`;
  popupTotalPriceInfo.textContent = `${curTotal}`;
});

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; 
let yyyy = today.getFullYear();

if (dd < 10) dd ='0' + dd;
if (mm < 10) mm ='0'+ mm;

today = `${yyyy}-${mm}-${dd}`;
inputDate.setAttribute('min', today);

const months = {
  01: 'January',
  02: 'February',
  03: 'March',
  04: 'April',
  05: 'May',
  06: 'June',
  07: 'July',
  08: 'August',
  09: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const weekdays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

inputDate.addEventListener('change', (e) => {
  const value = e.target.value;  
  const [year, month, day] = value.split('-');
  const date = new Date(year, month - 1, day);
  const weekday = date.getDay();

  if (!value) {
    weekdayInfo.textContent = `--`;
    monthInfo.textContent = `--`;
    dayInfo.textContent = `--`;
    return;
  }

  weekdayInfo.textContent = `${weekdays[weekday]}`;
  monthInfo.textContent = `${months[month]}`;
  dayInfo.textContent = `${day}`;
});

dateWrapper.addEventListener('click', (e) => {
  dateWrapper.classList.add('no-pseudo');
  inputDate.classList.add('bigger-padding');
});

timeWrapper.addEventListener('click', (e) => {
  timeWrapper.classList.add('no-pseudo');
  selectTime.classList.add('bigger-padding');
});

selectTime.addEventListener('change', (e) => {
  const { value } = e.target;
  timeInfo.textContent = `${value}`;
});

selectType.addEventListener('change', ({ target }) => {
  const type = target.options[target.selectedIndex].text;
  popupSelectedType = type;
  ticketTypeInfo.textContent = `${type}`;
});

popupInputBasic.addEventListener('change', (e) => { 
  popupBasicAmount = e.target.value;
  popupCurTotal = getPopupTotalPrice(popupSelectedType);

  popupBasicAmountInfo.textContent = `${popupBasicAmount}`;  
  popupTotalBasicSumInfo.textContent = `${prices[popupSelectedType] * popupBasicAmount}`;
  popupTotalPriceInfo.textContent = `${popupCurTotal}`;
});

popupInputSenior.addEventListener('change', (e) => {
  popupSeniorAmount = e.target.value;
  popupCurTotal = getPopupTotalPrice(popupSelectedType);
  
  popupSeniorAmountInfo.textContent = `${popupSeniorAmount}`;
  popupTotalSeniorSumInfo.textContent = `${(prices[popupSelectedType] /2) * popupSeniorAmount}`; 
  popupTotalPriceInfo.textContent = `${popupCurTotal}`;
});

selectType.addEventListener('change', (e) => {
  popupSelectedType = e.target.value;
  popupCurTotal = getPopupTotalPrice(popupSelectedType);

  popupBasicAmountInfo.textContent = `${popupBasicAmount}`;
  popupBasicTypePrice1.textContent = `${prices[popupSelectedType]}`;
  popupBasicTypePrice2.textContent = `${prices[popupSelectedType]}`;
  popupTotalBasicSumInfo.textContent = `${prices[popupSelectedType] * popupBasicAmount}`;
  popupSeniorAmountInfo.textContent = `${popupSeniorAmount}`;
  popupSeniorTypePrice1.textContent = `${prices[popupSelectedType] /2}`;
  popupSeniorTypePrice2.textContent = `${prices[popupSelectedType] /2}`;
  popupTotalSeniorSumInfo.textContent = `${(prices[popupSelectedType] /2) * popupSeniorAmount}`;
  popupTotalPriceInfo.textContent = `${popupCurTotal}`;
});

const nameReg = /^(([a-zA-Z\s]{3,15})$|^([а-яёА-ЯЁ\s]{3,15}))$/;
const mailReg = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}.[a-zA-Z]{2,}$/;
const phoneReg = /^\d{1,10}$|^(\d{2}[-]){1,4}\d{2}$|^(\d{2}[ ]){1,4}\d{2}$|^(\d{3}[-]){1,3}\d{3}$|^(\d{3}[ ]){1,3}\d{3}$/;

const validate = (e) => {
  const target = e.target;
  const { value } = e.target;

  if (target.name === 'name') {
    if (!nameReg.test(value)) {
      target.classList.remove('valid-input'); 
      target.classList.add('invalid-input');
      userNameRequirements.style.display = 'block';
    } else {
      target.classList.remove('invalid-input');
      target.classList.add('valid-input');
      userNameRequirements.style.display = 'none';
    }
  }

  if (target.name === 'mail') {
    if (!mailReg.test(value)) {
      target.classList.remove('valid-input'); 
      target.classList.add('invalid-input');
      mailRequirements.style.display = 'block';
    } else {
      target.classList.remove('invalid-input');
      target.classList.add('valid-input');
      mailRequirements.style.display = 'none';
    }
  }

  if (target.name === 'phone') {
    if (target.name === 'phone') {
      if (!phoneReg.test(value)) {
        target.classList.remove('valid-input'); 
        target.classList.add('invalid-input');
        phoneRequirements.style.display = 'block';
      } else {
        target.classList.remove('invalid-input');
        target.classList.add('valid-input');
        phoneRequirements.style.display = 'none';
      }
    }
  }
};

inputName.addEventListener('input', validate);
inputName.addEventListener('blur', (e) => { 
  userNameRequirements.style.display = 'none';
});

inputMail.addEventListener('input', validate);
inputMail.addEventListener('blur', (e) => {
  mailRequirements.style.display = 'none';
});

inputPhone.addEventListener('input', validate);
inputPhone.addEventListener('blur', (e) => {
  phoneRequirements.style.display = 'none';
});

popupForm.addEventListener('submit', (e) => {
  e.preventDefault();  
})
