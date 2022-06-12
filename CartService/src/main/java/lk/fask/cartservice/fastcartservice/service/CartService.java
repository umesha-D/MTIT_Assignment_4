package lk.fask.cartservice.fastcartservice.service;
import lk.fask.cartservice.fastcartservice.model.Cart;
import lk.fask.cartservice.fastcartservice.model.CartItems;
import lk.fask.cartservice.fastcartservice.repository.CartItemsRepository;
import lk.fask.cartservice.fastcartservice.repository.CartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemsRepository cartItemsRepository;

    public CartService(CartRepository cartRepository, CartItemsRepository cartItemsRepository) {
        this.cartRepository = cartRepository;
        this.cartItemsRepository = cartItemsRepository;
    }

    public ResponseEntity<?> createCart(Cart cart) throws URISyntaxException {
        Optional<Cart> existingCart = this.cartRepository.findByUserId(cart.getUserId());
        if(existingCart.isPresent()){
            return ResponseEntity.badRequest().body("A cart is already exist on database");
        }

        Cart createdCart = this.cartRepository.save(cart);
        return ResponseEntity.created(new URI("/create" + cart.getId())).body(createdCart);
    }

    public ResponseEntity<?> destroyCart(String userId) {
        Optional<Cart> existingCart = this.cartRepository.findByUserId(userId);
        if(existingCart.isPresent()){
            this.cartRepository.deleteByUserId(userId);
            return ResponseEntity.badRequest().body("Cart destroyed");
        }

        return ResponseEntity.badRequest().body("There is no any cart data for that user");
    }

    public ResponseEntity<?> viewCart(String userId) {
        Optional<Cart> cartData = this.cartRepository.findByUserId(userId);
        if(cartData.isPresent()){
            List<CartItems> cartItems = this.cartItemsRepository.findByCartId(cartData.get().getId());
            return ResponseEntity.ok().body(cartItems);
        }

        return ResponseEntity.badRequest().body("There is no any cart data for that user");
    }

    public ResponseEntity<?> addToCart(String userId, CartItems cartItems) {
        Optional<Cart> existingCart = this.cartRepository.findByUserId(userId);
        Cart cart = existingCart.get();
        cartItems.setCart(cart);
        this.cartItemsRepository.save(cartItems);

        return ResponseEntity.ok().body("item added to the cart");
    }

    public ResponseEntity<?> removeFromCart(String userId, int itemId) {
        Optional<Cart> currentCartData = this.cartRepository.findByUserId(userId);
        if(currentCartData.isPresent()){
            this.cartItemsRepository.deleteById(itemId);
            return ResponseEntity.ok().body("Successfully removed from the cart");
        }

        return ResponseEntity.badRequest().body("There is no any cart data for that user");
    }
}
