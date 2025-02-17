import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetCompletedSessionDto{
    @IsNotEmpty()
    @IsMongoId()
    sessionId: string
}