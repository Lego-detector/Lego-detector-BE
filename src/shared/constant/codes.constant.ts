import { HttpStatus } from '@nestjs/common';

import { ICodeObj } from '../interfaces';

export const CODES: ICodeObj = {
  OK: {
    message: 'Success.',
    display: 'ทำรายการสำเร็จ',
    statusCode: HttpStatus.OK,
  },
  BAD_REQUEST: {
    message: 'Bad request.',
    display: 'ข้อมูลที่ส่งมาไม่ถูกต้อง',
    statusCode: HttpStatus.BAD_REQUEST,
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
  SIGNIN_FAILED: {
    message: 'Email or password wrong',
    display: 'กรอกอีเมลหรือรหัสผ่านผิด',
    statusCode: HttpStatus.UNAUTHORIZED,
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
  SESSIONS_NOT_YET_COMPLETED: {
    message: 'Sessions not yet completed.',
    display: 'เซสชั่นยังไม่เสร็จสมบูรณ์',
    statusCode: HttpStatus.ACCEPTED,
  },
  SESSIONS_NOT_BELONG_TO_USER: {
    message: 'Sessions not belong to current user.',
    display: 'ผู้ใช้ปัจจุบันไม่ได้เป็นเจ้าของหมายเลขเซสชั่นนี้',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  OUT_OF_SESSION_QUOTA: {
    message: 'Out of sessions quota.',
    display: 'ได้มีการใช้งานโควต้าการตรวจจับของวันนี้หมดแล้ว',
    statusCode: HttpStatus.ACCEPTED,
  },
  HISTORY_NOT_FOUND: {
    message: 'History not found.',
    display: 'ไม่พบข้อมูลประวัติการตรวจจับ',
    statusCode: HttpStatus.NOT_FOUND,
  },
  INVALID_PAGINATION_PAGE: {
    message: 'Invalid pagination page.',
    display: 'ไม่พบหน้าที่ต้องการ',
    statusCode: HttpStatus.NOT_FOUND,
  },
  MIMETYPE_MISMATCH: {
    message: 'File type mismatch policy.',
    display: 'อัพโหลดไฟล์ผิดประเภท',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  FILE_REQUIRED: {
    message: 'File Required.',
    display: 'ต้องการไฟล์',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  FAILED_TO_UPLOAD: {
    message: 'Failed to upload file.',
    display: 'ไม่สามารถอัพโหลดไฟล์ได้',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  },
};
