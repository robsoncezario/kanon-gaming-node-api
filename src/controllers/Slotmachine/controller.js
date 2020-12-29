const User = require("../../models/User/model");

class SlotmachineController {
  static reels = [
    ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
    ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
    ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]
  ];

  static points = [{
    condition: (rows) => rows.filter(r => r === "cherry").length === 3,
    coins: 50
  },

  {
    condition: (rows) => [, ...rows].filter(r => r === "cherry").length === 2,
    coins: 40
  },

  {
    condition: (rows) => rows.filter(r => r === "apple").length === 3,
    coins: 20
  },

  {
    condition: (rows) => [, ...rows].filter(r => r === "apple").length === 2,
    coins: 10
  },

  {
    condition: (rows) => rows.filter(r => r === "banana").length === 3,
    coins: 20
  },

  {
    condition: (rows) => [, ...rows].filter(r => r === "banana").length === 2,
    coins: 5
  },

  {
    condition: (rows) => rows.filter(r => r === "lemon").length === 3,
    coins: 3
  }];

  static calculatePoints = (rows) => {
    var points = 0;

    for (var i = 0, l = SlotmachineController.reels[0].length; i < l; i++) {
      const items = rows.map(r => r[i]);
      const coins = SlotmachineController.points.find(p => p.condition(items))?.coins ?? 0;

      points += coins;
    }

    return points > 0 ? points : -1;
  }

  static spin = async (request, response) => {
    const data = request.user;
    const user = await User.findByPk(data.id);

    try {
      if(user.coins > 0) {
        const rows = SlotmachineController.reels.map(r => 
          r.map((a) => ({sort: Math.random(), value: a}))
           .sort((a, b) => a.sort - b.sort)
           .map((a) => a.value));
        const coins = SlotmachineController.calculatePoints(rows);

        user.coins += coins;
        await user.save();

        response.status(200);
        response.json({
          rows: rows,
          coins: coins
        });
      } else {
        response.status(403);
      }
    } catch {
      response.status(401);
    }
  }
}

module.exports = {
  spin: SlotmachineController.spin
};