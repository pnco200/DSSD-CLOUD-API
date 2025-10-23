import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OngService } from './ong.service';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Ong } from './ong.entity';

@ApiTags('ongs')
@Controller('ongs')
export class OngController {
  constructor(private readonly ongService: OngService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ONG' })
  @ApiResponse({ status: 201, description: 'The ONG has been successfully created.', type: Ong })
  create(@Body() createOngDto: CreateOngDto) {
    return this.ongService.create(createOngDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ONGs' })
  @ApiResponse({ status: 200, description: 'Return all ONGs.', type: [Ong] })
  findAll() {
    return this.ongService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ONG by ID' })
  @ApiResponse({ status: 200, description: 'Return the ONG.', type: Ong })
  findOne(@Param('id') id: string) {
    return this.ongService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ONG' })
  @ApiResponse({ status: 200, description: 'The ONG has been successfully updated.', type: Ong })
  update(@Param('id') id: string, @Body() updateOngDto: UpdateOngDto) {
    return this.ongService.update(+id, updateOngDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ONG' })
  @ApiResponse({ status: 204, description: 'The ONG has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.ongService.remove(+id);
  }
}
