package com.mamoun.sentry;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public List<AssetEntity> getAllAssets(@AuthenticationPrincipal UserEntity user) {
        return assetService.getAllAssets(user);
    }

    @PostMapping
    public AssetEntity createAsset(@RequestBody AssetEntity asset, @AuthenticationPrincipal UserEntity user) {
        return assetService.addAsset(asset, user);
    }

    @PutMapping("/{id}")
    public AssetEntity updateAsset(@PathVariable Long id, @RequestBody AssetEntity asset,
                                   @AuthenticationPrincipal UserEntity user) {
        return assetService.updateAsset(id, asset, user);
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable Long id, @AuthenticationPrincipal UserEntity user) {
        assetService.deleteAsset(id, user);
    }
}
