import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  FormLabel,
  Spinner,
  Text,
  Avatar,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useAppSelector } from '../../app/hooks/use-store';
import { usePostThread } from '../../app/hooks/use-post-thread';
import { LuImagePlus } from 'react-icons/lu';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    usePostThread();
  const user = useAppSelector((state) => state.auth.user);
  console.log(watch());
  // // State untuk menyimpan URL preview gambar
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  // // Fungsi untuk menangani perubahan file input
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const previewUrl = URL.createObjectURL(file);
  //     setImagePreview(previewUrl); // Simpan URL gambar ke state
  //   }
  // };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        backdropFilter="blur(1px)"
        backgroundColor="rgba(128, 128, 128,0.1)"
      />
      <ModalContent
        minW="45vw"
        mt={'100px'}
        overflow="auto"
        background="#1D1D1D"
        borderRadius={'15px'}
        textColor={'white'}
      >
        <ModalHeader>Create New Post</ModalHeader>
        <ModalCloseButton
          width="20px"
          height="20px"
          m={'5px 2px'}
          rounded="full"
          fontSize={'7px'}
          color="home.link"
          fontWeight={'bold'}
          border="1.5px solid #909090"
        />

        {/* Form Post */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={3}>
            <FormControl
              mt={4}
              gap={2}
              display="flex"
            >
              <Avatar
                src={user.avatarUrl}
                name={user.name}
                height={'40px'}
                width={'40px'}
                rounded={'full'}
                objectFit="cover"
              />
              <Input
                width="100%"
                resize="none"
                color="white"
                height={'48px'}
                {...register('content', { required: 'Content is required' })}
                placeholder="What Is Happening?!"
                _focusVisible={{
                  borderColor: 'transparent',
                }}
                _hover={{
                  borderColor: 'transparent',
                }}
              />
              {errors.content && (
                <Text
                  fontSize={13}
                  color={'red'}
                >
                  * {errors.content.message}
                </Text>
              )}
              <Flex>
                <FormControl mt={2}>
                  <FormLabel
                    cursor={'pointer'}
                    display={'flex'}
                    color={'home.button.hoverText'}
                    fontSize={'25px'}
                  >
                    <LuImagePlus />
                  </FormLabel>
                  <Input
                    type="file"
                    {...register('imageUrl')}
                    hidden
                    name="imageUrl"
                    // onAbort={handleImageChange}
                  />
                  {errors.imageUrl && (
                    <Text
                      fontSize={13}
                      color={'red'}
                    >
                      * Error uploading image
                    </Text>
                  )}
                </FormControl>
              </Flex>
              {/* Preview gambar */}
            </FormControl>
            {/* {watch('imageUrl') && (
              <Image
                mt={4}
                src={URL.createObjectURL(watch('imageUrl')[0])}
                rounded={'5px'}
              />
            )} */}
            {watch('imageUrl') && watch('imageUrl').length > 0 && (
              <Image
                mt={4}
                src={URL.createObjectURL(watch('imageUrl')[0])} // Menggunakan file pertama
                rounded={'5px'}
                borderBottom={'solid 1px'}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              backgroundColor={'tweet.green'}
              color={'tweet.putih'}
              height={'33px'}
              justifyItems={'center'}
              rounded={'full'}
              alignItems={'center'}
              padding={4}
              fontSize={'14px'}
              fontWeight={700}
              lineHeight={'17px'}
              isDisabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : 'Post'}
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
