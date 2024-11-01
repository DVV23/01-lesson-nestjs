import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPost } from '@src/models/post.interface';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { CreatePostDto } from '@src/dtos/create-post-dto';

@Injectable()
export class PostsService {
  private posts: IPost[] = [];
  constructor(
    @InjectRepository(PostEntity) private repo: Repository<PostEntity>,
  ) {}
  async getAllPosts(): Promise<IPost[]> {
    try {
      this.posts = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      ).then((res) => res.json());
      return this.posts;
    } catch (err) {
      console.log(err);
    }
  }
  async getPostById(id: string): Promise<IPost> {
    let response: IPost;
    try {
      response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      ).then((res) => res.json());
      return response;
    } catch (err) {
      throw new BadRequestException();
    }
  }
  async getPostsByUserId(userId: number): Promise<IPost | IPost[]> {
    try {
      return await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      ).then((res) => res.json());
    } catch (err) {
      throw new BadRequestException();
    }
  }
  async getPostUsingFilters(userId: number, id: number) {
    try {
      return await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}&id=${id}`,
      ).then((res) => res.json());
    } catch (err) {
      console.log(err);
    }
  }
  async createPost(body: CreatePostDto): Promise<CreatePostDto> {
    try {
      const newPost = this.repo.create(body);
      return await this.repo.save(newPost);
    } catch (err) {
      console.log(err);
    }
  }
}
