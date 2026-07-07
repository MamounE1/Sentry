package com.mamoun.sentry;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssetService {

    private final AssetRepository repository;

    // Dependency Injection: Spring provides the repository automatically
    public AssetService(AssetRepository repository) {
        this.repository = repository;
    }

    public List<AssetEntity> getAllAssets() {
        return repository.findAll();
    }

    public AssetEntity addAsset(AssetEntity asset) {
        return repository.save(asset);
    }

    public void deleteAsset(Long id) {
        repository.deleteById(id);
    }
}