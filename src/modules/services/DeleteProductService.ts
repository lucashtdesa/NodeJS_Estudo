import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    await productsRepository.remove(product);
  }
}
export default DeleteProductService;
