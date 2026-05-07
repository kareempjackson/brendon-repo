import { IsEnum } from 'class-validator';

export enum ConnectionAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
}

export class UpdateConnectionDto {
  @IsEnum(ConnectionAction)
  action: ConnectionAction;
}
