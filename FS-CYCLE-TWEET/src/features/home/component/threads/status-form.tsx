import {
  FormControl,
  Button,
  Box,
  Flex,
  Input,
  Avatar,
  Text,
  Spinner,
  FormLabel,
  Image,
} from '@chakra-ui/react';
import { LuImagePlus } from 'react-icons/lu';
import { useAppSelector } from '../../../../app/hooks/use-store';
import useHome from '../../hooks/use-home';

export function StatusForm({
  placeholder,
  buttonTitle,
}: {
  placeholder: string;
  buttonTitle: string;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    useHome();
  const user = useAppSelector((state) => state.auth.user);
  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        display={'flex'}
        alignItems={'center'}
        gap={4}
        justifyContent={'space-between'}
        borderBottom={'solid 1px'}
        borderColor={'brand.borderAbu'}
        p={4}
      >
        <Avatar
          src={user.avatarUrl}
          name={user.name}
          height={'40px'}
          width={'40px'}
          rounded={'full'}
          objectFit="cover"
        />
        <Box flex={'1'}>
          <Input
            {...register('content')}
            variant={'unstyled'}
            border={'none'}
            placeholder={placeholder}
          />
          {errors.content && (
            <Text
              fontSize={13}
              color={'red'}
            >
              * {errors.content.message}
            </Text>
          )}
        </Box>
        <Flex
          alignItems={'center'}
          gap={4}
        >
          <FormControl>
            <FormLabel
              cursor={'pointer'}
              display={'flex'}
              color={'home.button.hoverText'}
              fontSize={'25px'}
            >
              <LuImagePlus />
            </FormLabel>
            <Box flex={'1'}>
              <Input
                type="file"
                {...register('imageUrl')}
                hidden
                name="imageUrl"
              />

              {errors.imageUrl && (
                <Text
                  fontSize={13}
                  color={'red'}
                >
                  Error Upload Image
                </Text>
              )}
            </Box>
          </FormControl>
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
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
      {watch('imageUrl') && watch('imageUrl').length > 0 && (
        <Image
          mt={4}
          src={URL.createObjectURL(watch('imageUrl')[0])} // Menggunakan file pertama
          rounded={'5px'}
          borderBottom={'solid 1px'}
        />
      )}
    </form>
  );
}
