import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  FormControl,
  FormErrorMessage,
  Avatar,
  Spinner,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../app/hooks/use-store';
import { usePostReply } from '../hooks/use-post-replies';
import { useParams } from 'react-router-dom';
import { LuImagePlus } from 'react-icons/lu';

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        display="flex"
        alignItems="center"
        gap={4}
        borderBottom="1px solid"
        borderColor="brand.borderAbu"
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
            {...register('imageUrl')}
            display="none"
            id="image-upload"
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
    </form>
  );
}
