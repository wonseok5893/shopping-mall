package com.project.shoppingmall.controller.responsedto.file;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.shoppingmall.domain.File;
import lombok.Data;

@Data
public class ResponseFile {
    String filePath;
    @JsonIgnore
    Long productId;

    public ResponseFile(String filePath, Long productId) {
        this.filePath = filePath;
        this.productId = productId;
    }

    public ResponseFile(File file) {
        this.filePath = file.getFilePath();
    }
}
