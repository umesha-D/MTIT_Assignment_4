package lk.fask.cartservice.fastcartservice.repository;

import lk.fask.cartservice.fastcartservice.model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Integer> {
    List<CartItems> findByCartId(int cartId);
}
