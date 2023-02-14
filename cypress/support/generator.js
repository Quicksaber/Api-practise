module.exports = {
  randomStringGenerator(number) {
    let name = "";
    for (let i = 0; i < number; i++) {
      const random = Math.floor(Math.random() * 26);
      name += String.fromCharCode(97 + random);
    }
    return name;
  },
};
