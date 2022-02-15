import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get(':imageName')
  async findOne(
    @Param('imageName') imageName: string,
    @Req() req: RequestWithUser,
    @Res() res: any,
  ) {
    // @TODO write guard that will be checking if the recipe is shared or if the user equals this from photo. User ID as well as the isShared info could be stored in image name.
    const photo = await this.photosService.getOnePhoto(imageName);
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(photo, 'binary');
  }
}
