import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ong } from './ong.entity';
import { OngService } from './ong.service';
import { OngController } from './ong.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ong])],
  providers: [OngService],
  controllers: [OngController],
  exports: [OngService],
})
export class OngModule {}
