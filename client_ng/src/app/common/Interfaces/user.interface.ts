import { Role } from "src/app/common/enums/role.enum";

export interface User {
  id: number;
  username: string;
  role: Role;
}
