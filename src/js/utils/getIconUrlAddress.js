export const getAddressOfIcon = iconNumber => {
  if(iconNumber < 9) iconNumber = "0" + iconNumber;
  return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
}