import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from '@src/models/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<IPost[]> {
    return await this.postsService.getAllPosts();
  }
  @Get('/by-user')
  async getPostByUserId(@Query('userId') userId: string): Promise<IPost> {
    if (!userId) throw new BadRequestException('Error in userId query');
    return await this.postsService.getPostByUserId(+userId);
  }
  @Get('/filters')
  async getPostUsingFilters(
    @Query('userId') userId: string,
    @Query('id') id: string,
  ) {
    if (userId && id) {
      console.log(userId, id);
      return this.postsService.getPostUsingFilters(+userId, +id);
    }
    throw new BadRequestException('userId or title query is missing');
  }
  @Get('/:id')
  async getPostById(@Param('id') id: string): Promise<IPost> {
    return await this.postsService.getPostById(id);
  }
}
