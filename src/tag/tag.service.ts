import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagRepository: Model<Tag>,
  ) {}

  public async createTag(createTagDto: CreateTagDto) {
    const newTag = new this.tagRepository(createTagDto);
    return await newTag.save();
  }
}
