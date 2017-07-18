export class User{
  public username: string;
  public password: string;
  public phone ?: number;
  public email ?: string;
  public image = "avatar/icon/avatar.png";

  constructor(
    obj: any
  ){
    this.username = obj.username;
    this.password = obj.password;
    this.phone = obj.phone;
    this.email = obj.email;
  }

  setImage(FilePath){
      this.image = FilePath;
  }
}
