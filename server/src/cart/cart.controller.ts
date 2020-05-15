import {
    Controller,
    Get,
    Query,
    ValidationPipe,
    Session,
    Headers,
  } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetCartChangeDto } from './dto/cart-change.dto';
import { Cart } from './utils/cart';


  @Controller('api/cart')
  export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    getCart(@Session() session): Promise<Cart> {
       return this.cartService.getCart(session.cart);
    }

    @Get('/add')
    async addToCart(
        @Session() session,
        @Query(ValidationPipe) getCartChangeDto : GetCartChangeDto,
        @Headers('lang') lang: string): Promise<Cart> {
        const newCart = await this.cartService.addToCart(session.cart, getCartChangeDto, lang);
        session.cart = newCart;
        return newCart;
    }

    @Get('/remove')
    async removeFromCart(
        @Session() session,
        @Query(ValidationPipe) getCartChangeDto : GetCartChangeDto,
        @Headers('lang') lang: string): Promise<Cart> {
        const newCart = await this.cartService.removeFromCart(session.cart, getCartChangeDto, lang);
        session.cart = newCart;
        return newCart;
    }


  }
