import { HttpStatus } from '@nestjs/common';

import { ICodeObj } from '../interfaces';

export const CODES: ICodeObj = {
  SUCCESS: {
    message: 'Success',
    display: 'ทำรายการสำเร็จ',
    statusCode: HttpStatus.OK,
  },
};
