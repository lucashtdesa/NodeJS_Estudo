import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | null> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    return product;
  }
}
export default ShowProductService;
