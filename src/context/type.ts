export interface AuthContextValueType {
  isAuth: boolean;
  login: () => void;
  logOut: () => void;
}
