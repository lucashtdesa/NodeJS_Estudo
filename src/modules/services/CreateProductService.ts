import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('Já existe na base um produto com esse nome');
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
