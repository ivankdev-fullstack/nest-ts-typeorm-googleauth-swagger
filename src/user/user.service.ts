import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginatedResponse, PaginationOptions } from '../interfaces/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {}

  public async getAll(
    options: PaginationOptions,
  ): Promise<PaginatedResponse<User>> {
    const { page, limit } = options;

    const skip = (page - 1) * limit;
    const users = await this.userRepository.find().skip(skip).limit(limit);
    const total = await this.userRepository.countDocuments();

    return {
      data: users,
      limit,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  public async getBy(fields: FilterQuery<User>): Promise<User | null> {
    return this.userRepository.findOne(fields);
  }

  public async create(data: CreateUserDto): Promise<User> {
    const createdUser = new this.userRepository(data);
    return createdUser.save();
  }

  public async updateById(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepository
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }
    return updatedUser;
  }

  public async deleteById(id: string): Promise<boolean> {
    const isUserDeleted = await this.userRepository.deleteOne({ _id: id });
    return !!isUserDeleted.deletedCount;
  }
}
