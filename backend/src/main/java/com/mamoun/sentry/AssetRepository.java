package com.mamoun.sentry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<AssetEntity, Long> {
    // Free methods included: .save(), .findAll(), .deleteById(), .count()
}