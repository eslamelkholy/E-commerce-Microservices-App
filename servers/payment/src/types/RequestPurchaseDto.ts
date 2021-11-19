export class RequestPurchaseDto {
  public id?: number;
  public userId: string;
  public productId: string;
  public price: number;
  public imageUrl?: string;
  public name?: string;
  public description?: string;
  public status?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}
