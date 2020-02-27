export const invoices = [
  {
    customer: "MDT",
    performances: [
      {
        playId: 123,
        audience: 55
      },
      {
        playId: 234,
        audience: 35
      },
      {
        playId: 345,
        audience: 40
      }
    ]
  }
];

export const plays = {
  123: { type: "tragedy", name: "Гамлет" },
  234: { type: "tragedy", name: "Ромео и Джульетта" },
  345: { type: "comedy", name: "Отелло" }
};
