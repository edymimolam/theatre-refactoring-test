import { invoices, plays } from "./data";

const format = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2
}).format;

const calcAmountForTradegy = audience =>
  audience > 30 ? 40000 + 1000 * (audience - 30) : 40000;

const calcAmountForComedy = audience =>
  audience > 20
    ? 40000 + 500 * (audience - 20) + 300 * audience
    : 30000 + 300 * audience;

const calcAmount = (type, audience) => {
  switch (type) {
    case "tragedy":
      return calcAmountForTradegy(audience);
    case "comedy":
      return calcAmountForComedy(audience);
    default:
      throw new Error(`неизвестный тип: ${type}`);
  }
};

const calcCredits = (type, audience) => {
  let credits = Math.max(audience - 30, 0);
  // Дополнительный бонус за каждые 10 комедий
  if (type === "comedy") credits += Math.floor(audience / 5);
  return credits;
};

const statement = (invoice, plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Счет для ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playId];

    // Расчет стоимости
    let thisAmount = calcAmount(play.type, perf.audience);

    // Добавление бонусов
    volumeCredits += calcCredits(play.type, perf.audience);

    // Вывод строки счета
    result += ` ${play.name}: ${format(thisAmount / 100)}`;
    result += ` (${perf.audience} мест)\n`;
    totalAmount += thisAmount;
  }

  // Вывод общего счета
  result += `Итого с вас ${format(totalAmount / 100)}\n`;
  result += `Вы заработали ${volumeCredits} бонусов\n`;
  return result;
};
