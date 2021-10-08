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
const inputDate = document.getElementById('date');
const inputTime = document.getElementById('time');
const inputName = document.getElementById('name');
const inputMail = document.getElementById('mail');
const inputPhone = document.getElementById('phone');
const selectType = document.querySelector('.details-form__select');
const popupInputBasic = document.getElementById('popup-basic');
const popupInputSenior = document.getElementById('popup-senior');

const dayInfo = document.querySelector('.overview__date--day');
const monthInfo = document.querySelector('.overview__date--month');
const yearInfo = document.querySelector('.overview__date--year');
const hoursInfo = document.querySelector('.overview__time--hrs');
const minutesInfo = document.querySelector('.overview__time--min');
const ticketTypeInfo = document.querySelector('.overview__ticket-type');
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

inputBasic.value = basicAmount;
inputSenior.value = seniorAmount;
totalPriceInfo.textContent = `${curTotal}`;

const getTotalPrice = (type) => {
  const basicTotalPrice = prices[type] * basicAmount;
  const seniorTotalPrice = (prices[type] / 2) * seniorAmount;

  return basicTotalPrice + seniorTotalPrice;
};

inputBasic.addEventListener('change', (e) => { 
  basicAmount = e.target.value;
  curTotal = getTotalPrice(curType);

  sessionStorage.setItem('basicAmount', basicAmount);
  sessionStorage.setItem('curTotal', curTotal);
  
  totalPriceInfo.textContent = `${curTotal}`;
});

inputSenior.addEventListener('change', (e) => {
  seniorAmount = e.target.value;
  curTotal = getTotalPrice(curType);

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
  popupSeniorAmountInfo.textContent = `${seniorAmount}`;
  popupTotalBasicSumInfo.textContent = `${prices[curType] * basicAmount}`;
  popupTotalSeniorSumInfo.textContent = `${(prices[curType] /2) * seniorAmount}`;
  popupTotalPriceInfo.textContent = `${curTotal}`;
});
