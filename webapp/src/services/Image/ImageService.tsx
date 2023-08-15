import ImageApi from '../../api/Image/ImageApi';

export default class ImageService {
  constructor(private readonly imageApi: ImageApi) {}

  getImageBaseUrl() {
    return this.imageApi.getImageBaseUrl();
  }
}
