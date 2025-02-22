import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async createUser(@Body() CreateUserDto: CreateUserDto) {
        try {
            const user = await this.usersService.createUser(
                CreateUserDto.email,
                CreateUserDto.password,
                CreateUserDto.role || "viewer",
            );
            return { message: 'User registered succesfully', user };
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        const updateUser = await this.usersService.update(+id, updateUserDto);
        if (!updateUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        } return { message: 'User updated succesfully', user: updateUser };
    }

    @Delete(':id')
    async removeUser(@Param('id') id: number) {
        const result = await this.usersService.remove(+id);
        if (!result.affected) {
            throw new NotFoundException(`User with ID ${id} not found`);
        } return { message: "User deleted succesfully" };
    }

    @Post(':id/promote-to-chef')
    async promoteToChef(
        @Param('id') userId: string,
        @Body() promoteData: { bio: string; complianceAck: boolean; defaultCuisineType: string },
    ) {
        const chef = await this.usersService.promoteToChef(
            +userId,
            promoteData.bio,
            promoteData.complianceAck,
            promoteData.defaultCuisineType,
        );

        if (!chef) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return { message: 'User promoted to chef', chef };
    }
}

