import { Button, chakra, Flex, Image } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { base64ToFile, fileToBase64 } from "~/interface/FormValues";

interface FileInputProps {
  name: string;
  accept: { [key: string]: string[] };
  defaultValue?: string;
}

const FileInput: React.FC<FileInputProps> = (props) => {
  const { name, accept, defaultValue } = props;

  const { register, unregister, setValue, watch } = useFormContext();

  const onDrop: DropzoneOptions["onDrop"] = useCallback(
    (droppedFiles: File[]) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const image = watch(name) as File[];

  const [base64Image, setBase64Image] = useState<string | undefined>();
  useEffect(() => {
    if (image && image[0]) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fileToBase64(image[0]).then((base64Image) => setBase64Image(base64Image));
    } else {
      setBase64Image("");
    }
  }, [image]);

  useEffect(() => {
    if (defaultValue) {
      console.log(base64ToFile(defaultValue));
      setValue(name, [base64ToFile(defaultValue)], { shouldValidate: true });
    }
  }, [defaultValue, setValue, name]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        background="#fff"
        height="200px"
        width="300px"
        borderRadius="8px"
        opacity={base64Image ? "1" : ".9"}
      >
        {base64Image && (
          <>
            <Image
              {...getRootProps()}
              src={base64Image || ""}
              alt={""}
              width={300}
              height={200}
              borderRadius="5px"
              boxShadow="0px 0px 8px 4px rgba(0,0,0,0.3)"
            />
            <input name={name} {...getInputProps()} />
            <Button
              aria-label="Remove image"
              position="absolute"
              margin="8px"
              padding="0"
              background="primary"
              _hover={{ background: "primary-hover" }}
              onClick={() => setValue(name, undefined, { shouldDirty: true })}
            >
              <chakra.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="20px"
                fill="#fff"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </chakra.svg>
            </Button>
          </>
        )}
        {!base64Image && (
          <Button
            as="div"
            {...getRootProps()}
            role="button"
            aria-label="File Upload"
            id={name}
            alignItems="center"
            display="inline-flex"
            height="100%"
            width="100%"
            gap="12px"
            justifyContent="center"
          >
            <input name={name} {...getInputProps()} />
            <chakra.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="32px"
              fill="primary"
            >
              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
            </chakra.svg>
            Foto hinzufügen
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default FileInput;
