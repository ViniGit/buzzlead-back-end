const api = require('../services/api')

class CepController {
  async create(request, response) {
    try {
      const { uf, city, address } = request.body;
      if (address.length < 3) {
        response.status(400).json({ message: "Endereço deve conter mais de 2 letras." });
      } else {
        var addressNormalize = address.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); //removendo acentos para mandar na url da api de cep
        const arrayCep = await api.get(`/${uf}/${city}/${addressNormalize}/json/`);

        if (arrayCep.data.length === 0) {
          response.status(404).json({ message: "Endereço não encontrado." });
        } else {
          return response.json(arrayCep.data)
        }
      }
    } catch (error) {
      console.log(error)
      response.status(404).json({ message: "Endereço não encontrado." });
    }
  }
}
module.exports = CepController;