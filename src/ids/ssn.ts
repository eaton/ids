export const ssn = { isValid, format };

function isValid(input: string) {
  // Strip all non-digits
  const numeric = input.replaceAll(/[^\d]/g, '');

  // find area number (1st 3 digits, no longer actually signifies area)
  const area = parseInt(numeric.substring(0, 3));
  return (
    // 9 characters
    numeric.length === 9 &&
    // basic regex
    numeric.match(/^[0-8]{1}[0-9]{2}[0-9]{2}[0-9]{4}/) &&
    // disallow Satan's minions from becoming residents of the US
    area !== 666 &&
    // it's not triple nil
    area !== 0 &&
    // fun fact: some idiot boss put his secretary's ssn in wallets
    // he sold, now it "belongs" to 40000 people
    numeric !== '078051120' &&
    // was used in an ad by the Social Security Administration
    numeric !== '219099999'
  );
}

function format(input: string) {
  const numeric = input.replaceAll(/[^\d]/g, '');
  [numeric.slice(0,3), numeric.slice(3,5), numeric.slice(5,10)].join('-');
}
