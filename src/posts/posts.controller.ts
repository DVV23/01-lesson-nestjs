import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from '@src/models/post.interface';
import { CreatePostDto } from '@src/dtos/create-post-dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<IPost[]> {
    return await this.postsService.getAllPosts();
  }
  @Get('/by-user')
  async getPostsByUserId(
    @Query('userId') userId: string,
  ): Promise<IPost | IPost[]> {
    if (!userId) throw new BadRequestException('Error in userId query');
    return await this.postsService.getPostsByUserId(+userId);
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
  @Post('/createpost')
  async createPost(@Body() body: CreatePostDto) {
    return await this.postsService.createPost(body);
  }
}
