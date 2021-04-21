package com.project.shoppingmall.controller.responsedto.file;

import com.project.shoppingmall.domain.File;
import lombok.Data;

@Data
public class ResponseFile {
    String filePath;
    Long productId;

    public ResponseFile(String filePath, Long productId) {
        this.filePath = filePath;
        this.productId = productId;
    }

    public ResponseFile(File file) {
        this.filePath = file.getFilePath();
    }
}
