export class WalletDto {
  public userId: string;
  public email: string;

  constructor(userId: string, email: string) {
    this.userId = userId;
    this.email = email;
  }
}
