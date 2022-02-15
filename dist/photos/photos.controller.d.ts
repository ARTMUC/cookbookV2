import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { PhotosService } from './photos.service';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    findOne(imageName: string, req: RequestWithUser, res: any): Promise<void>;
}
