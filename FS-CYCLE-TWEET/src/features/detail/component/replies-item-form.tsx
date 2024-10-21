import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  FormErrorMessage,
  Avatar,
  Spinner,
  Image,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../app/hooks/use-store';
import { usePostReply } from '../hooks/use-post-replies';
import { useParams } from 'react-router-dom';
import { LuImagePlus } from 'react-icons/lu';
import { useState } from 'react';

interface RepliesItemFormProps {
  placeholder: string;
  buttonTitle: string;
}

export default function RepliesItemForm({
  placeholder,
  buttonTitle,
}: RepliesItemFormProps) {
  const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams<{ id: string }>(); // Thread ID dari URL params
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePostReply(id);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        display="flex"
        alignItems="center"
        gap={4}
        borderBottom="1px solid"
        p={4}
        isInvalid={!!errors.content}
      >
        <Avatar
          src={user?.avatarUrl}
          name={user?.name}
          size="md"
        />
        <Box flex={1}>
          <Input
            {...register('content')}
            variant="unstyled"
            placeholder={placeholder}
            border="none"
          />

          {errors.content && (
            <FormErrorMessage
              fontSize={13}
              color={'red'}
            >
              * {errors.content.message}
            </FormErrorMessage>
          )}
        </Box>
        <Flex
          alignItems="center"
          gap={4}
        >
          <Input
            type="file"
            accept="image/*"
            display="none"
            id="image-upload"
            {...register('imageUrl')}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <LuImagePlus />
          </label>
          <Button
            type="submit"
            bg="tweet.green"
            color="tweet.putih"
            height="33px"
            rounded="full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? <Spinner size="sm" /> : buttonTitle}
          </Button>
        </Flex>
      </FormControl>
      {imagePreview && (
        <Image
          mt={4}
          src={imagePreview}
          alt="Image Preview"
          rounded={'5px'}
          borderBottom={'solid 1px'}
        />
      )}
    </form>
  );
}
