package com.mamoun.sentry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<AssetEntity, Long> {
    List<AssetEntity> findByUser(UserEntity user);
    Optional<AssetEntity> findByIdAndUser(Long id, UserEntity user);
}
