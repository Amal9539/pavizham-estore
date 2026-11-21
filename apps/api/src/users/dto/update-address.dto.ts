import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country?: string;
}