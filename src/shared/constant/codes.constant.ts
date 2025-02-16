import { HttpStatus } from '@nestjs/common';

import { ICodeObj } from '../interfaces';

export const CODES: ICodeObj = {
  OK: {
    message: 'Success.',
    display: 'ทำรายการสำเร็จ',
    statusCode: HttpStatus.OK,
  },
  NOT_FOUND: {
    message: 'Not found.',
    display: 'ไม่พบ endpoint ดังกล่าว',
    statusCode: HttpStatus.NOT_FOUND,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized.',
    display: 'ไม่ได้ยืนยันตัวตนเข้าสู้ระบบ',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error.',
    display: 'มีปัญหาเกิดขึ้นภายในระบบ โปรดติดต่อเจ้าหน้าที่',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  SERVICE_UNAVAILABLE: {
    message: 'Service unavialable.',
    display: 'มีปัญหาเกิดขึ้นภายในระบบ โปรดติดต่อเจ้าหน้าที่',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  },
  USER_NOT_FOUND: {
    message: 'User not found.',
    display: 'ไม่พบข้อมูลบัญชีผู้ใช้',
    statusCode: HttpStatus.NOT_FOUND,
  },
  USER_EMAIL_CONFLICT: {
    message: 'Email has been used by other users.',
    display: 'มีการใช้งานอีเมลนี้กับบัญชีผู้ใช้รายอื่นแล้ว',
    statusCode: HttpStatus.CONFLICT,
  },
  MQ_UNAVAILABLE: {
    message: 'MQ service error.',
    display: 'มีปัญหากับการติดต่อ MQ',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  },
};
