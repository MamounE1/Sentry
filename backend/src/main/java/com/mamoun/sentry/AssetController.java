package com.mamoun.sentry;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping
    public List<AssetEntity> getAllAssets() {
        return assetService.getAllAssets();
    }

    @PostMapping
    public AssetEntity createAsset(@RequestBody AssetEntity asset) {
        return assetService.addAsset(asset);
    }

    @PutMapping("/{id}")
    public AssetEntity updateAsset(@PathVariable Long id, @RequestBody AssetEntity asset) {
        return assetService.updateAsset(id, asset);
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
    }
}