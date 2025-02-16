import { HttpStatus } from '@nestjs/common';

import { ICodeObj } from '../interfaces';

export const CODES: ICodeObj = {
  SUCCESS: {
    message: 'Success',
    display: 'ทำรายการสำเร็จ',
    statusCode: HttpStatus.OK,
  },
  NOT_FOUND: {
    message: 'Not found',
    display: 'ไม่พบ url ดังกล่าว',
    statusCode: HttpStatus.NOT_FOUND,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    display: 'ไม่ได้ยืนยันตัวตนเข้าสู้ระบบ',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  INTERNAL: {
    message: 'Internal server error',
    display: 'มีปัญหาเกิดขึ้นภายในระบบ โปรดติดต่อเจ้าหน้าที่',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    display: 'ไม่พบข้อมูลผู้ใช้',
    statusCode: HttpStatus.NOT_FOUND,
  },
};
