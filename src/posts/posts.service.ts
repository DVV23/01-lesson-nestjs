import { BadRequestException, Injectable } from '@nestjs/common';
import { IPost } from '@src/models/post.interface';

@Injectable()
export class PostsService {
  private posts: IPost[] = [];
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
  async getPostByUserId(userId: number): Promise<IPost> {
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
}
