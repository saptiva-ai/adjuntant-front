import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";

type FileUploaderProps = {
  onFileAdded: (file: File) => void;
  className?: string;
};

const FileUploader: React.FC<FileUploaderProps> = ({ onFileAdded, className }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const pdfFile = acceptedFiles.find(file => file.type === "application/pdf");
      if (pdfFile) {
        setUploadedFile(pdfFile);
        onFileAdded(pdfFile);
      }
    }, [onFileAdded]);
  
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      accept: {
            "application/pdf": [".pdf"]
        },
      maxFiles: 1,
      maxSize: 10485760, 
      noClick: true,
      onDrop,
    });
  
    return (
      <div {...getRootProps()} className={`file-uploader ${className}`}>
        <input {...getInputProps()} />
        {uploadedFile ? (
          <div className="flex items-center">
            <AiOutlineFilePdf className="text-red-500 text-2xl mr-2" />
            <span>{uploadedFile.name}</span>
          </div>
        ) : (
          <div className="p-4 border border-dashed border-gray-400 rounded items-center justify-center text-center">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
                <>
                  <p>Suelta archivos aquí o</p>
                  <p>                    
                    <button type="button" onClick={open} className="text-blue-500 underline">
                      Navegar por archivos
                    </button>
                    {" "}📁
                  </p>
                </>
                )}
          </div>
        )}
      </div>
    );
  };
  
  export default FileUploader;
