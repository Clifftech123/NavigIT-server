import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DashboardModule]
})
export class UsersModule {}
