import { Controller } from '@nestjs/common';

import { AdminService } from '../services';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
