package lk.fask.cartservice.fastcartservice.controller;

import lk.fask.cartservice.fastcartservice.model.Cart;
import lk.fask.cartservice.fastcartservice.model.CartItems;
import lk.fask.cartservice.fastcartservice.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@Controller
@RestController
@RequestMapping("/api/cart/")
@Transactional
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCart(@Validated @RequestBody Cart cart) throws URISyntaxException {
        return this.cartService.createCart(cart);
    }

    @DeleteMapping("/destroy/{userId}")
    public ResponseEntity<?> destroyCart(@PathVariable String userId){
        return this.cartService.destroyCart(userId);
    }

    @GetMapping("/view/{userId}")
    public ResponseEntity<?> viewCart(@PathVariable String userId){
        return this.cartService.viewCart(userId);
    }

    @PostMapping("/addItems/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable String userId, @Validated @RequestBody CartItems cartItems){
        return this.cartService.addToCart(userId, cartItems);
    }

    @PostMapping("/removeItems/{userId}/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable String userId, @PathVariable int itemId){
        return this.cartService.removeFromCart(userId, itemId);
    }

}
