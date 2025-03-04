import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator'

import { UserRole } from 'src/shared'

export class UpdateUserRoleDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
}