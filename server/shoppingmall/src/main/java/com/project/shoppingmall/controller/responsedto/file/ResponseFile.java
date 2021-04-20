package com.project.shoppingmall.controller.responsedto.file;

import com.project.shoppingmall.domain.File;
import lombok.Data;

@Data
public class ResponseFile {
    String filePath;

    public ResponseFile(File file) {
        this.filePath = file.getFilePath();
    }
}
