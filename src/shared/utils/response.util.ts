import { ICode, IResponse } from '../interfaces';

export const mapResponse = <T>(
  meta: ICode,
  data: T = undefined,
  display: string = undefined,
  message: string | string[] = undefined,
): IResponse<T> => {
  return {
    ...meta,
    display: display || meta.display,
    message: message || meta.message,
    data,
  };
};
