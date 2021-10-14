import {
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe
} from "@nestjs/common";
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find({
      select: ['name', 'description'],
      where: [
        {
          //description: Like('%cas%'),
        },
      ],
      take: 2,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    const event = await this.repository.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      when: new Date(),
    });
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  ) {
    const event = await this.repository.findOne(id);

    return await this.repository.save({
      ...event,
      ...input,
      when: new Date(),
    });
  }

  @Delete(':id')
  //@HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
    return 'Evento eliminado';
  }
}
