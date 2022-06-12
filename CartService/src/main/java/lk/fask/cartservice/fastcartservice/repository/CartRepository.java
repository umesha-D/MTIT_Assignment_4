package lk.fask.cartservice.fastcartservice.repository;

import lk.fask.cartservice.fastcartservice.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByUserId(String userId);
    Optional<?> deleteByUserId(String userId);
}
