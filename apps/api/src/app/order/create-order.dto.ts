import { IsCurrencyCode } from '@ghostfolio/api/validators/is-currency-code';
import { IsAfter1970Constraint } from '@ghostfolio/common/validator-constraints/is-after-1970';

import {
  AssetClass,
  AssetSubClass,
  DataSource,
  Tag,
  Type
} from '@prisma/client';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate
} from 'class-validator';
import { isString } from 'lodash';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  accountId?: string;

  @IsEnum(AssetClass, { each: true })
  @IsOptional()
  assetClass?: AssetClass;

  @IsEnum(AssetSubClass, { each: true })
  @IsOptional()
  assetSubClass?: AssetSubClass;

  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) =>
    isString(value) ? value.trim() : value
  )
  comment?: string;

  @IsCurrencyCode()
  currency: string;

  @IsCurrencyCode()
  @IsOptional()
  customCurrency?: string;

  @IsEnum(DataSource)
  @IsOptional()
  dataSource?: DataSource;

  @IsISO8601()
  @Validate(IsAfter1970Constraint)
  date: string;

  @IsNumber()
  @Min(0)
  fee: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  symbol: string;

  @IsArray()
  @IsOptional()
  tags?: Tag[];

  @IsEnum(Type, { each: true })
  type: Type;

  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsBoolean()
  @IsOptional()
  updateAccountBalance?: boolean;
}
