import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get()
  public async getPosts() {
    return this.postService.findAll();
  }

  @ApiOperation({
    summary: 'Creates a new post for the blog.',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a success 201 response if the post is created successfully',
  })
  @Post()
  public async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates and existing blog post in the database.',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a success 20o response if the post is updated successfully',
  })
  @Patch()
  public async updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
  }
}
