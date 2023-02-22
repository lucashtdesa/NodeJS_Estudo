import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
}
