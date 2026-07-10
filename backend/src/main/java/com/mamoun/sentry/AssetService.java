package com.mamoun.sentry;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class AssetService {

    private final AssetRepository repository;

    // Dependency Injection: Spring provides the repository automatically
    public AssetService(AssetRepository repository) {
        this.repository = repository;
    }

    public List<AssetEntity> getAllAssets(UserEntity user) {
        return repository.findByUser(user);
    }

    public AssetEntity addAsset(AssetEntity asset, UserEntity user) {
        asset.setId(null);   // never let the client overwrite an existing row via POST
        asset.setUser(user);
        return repository.save(asset);
    }

    public AssetEntity updateAsset(Long id, AssetEntity asset, UserEntity user) {
        AssetEntity existing = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found"));
        existing.setSymbol(asset.getSymbol());
        existing.setName(asset.getName());
        existing.setQuantity(asset.getQuantity());
        existing.setPurchasePrice(asset.getPurchasePrice());
        return repository.save(existing);
    }

    public void deleteAsset(Long id, UserEntity user) {
        AssetEntity existing = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found"));
        repository.delete(existing);
    }
}
