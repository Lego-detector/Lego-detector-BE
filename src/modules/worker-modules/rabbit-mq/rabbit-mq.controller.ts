import { Controller } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';

@Controller('rabbit-mq')
export class RabbitMqController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}
}
