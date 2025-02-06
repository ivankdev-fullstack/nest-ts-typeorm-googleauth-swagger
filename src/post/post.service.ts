import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postRepository: Model<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    const newPost = new this.postRepository(createPostDto);
    return await newPost.save();
  }

  public async findAll() {
    return await this.postRepository
      .find()
      .populate('tags')
      .populate('author')
      .exec();
  }
}
