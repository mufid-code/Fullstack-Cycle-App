import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
  Text,
  Textarea,
  Box,
  Image,
  Avatar,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../app/hooks/use-store';
import { useUpdateUser } from '../../app/hooks/use-user';
import { HiOutlineXCircle } from 'react-icons/hi2';
import { LuImagePlus } from 'react-icons/lu';
import { useQueryClient } from '@tanstack/react-query';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const queryClient = useQueryClient(); // TanStack Query client
  const user = useAppSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
    },
  });
  const updateUserMutation = useUpdateUser();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('bio', data.bio);

    if (selectedFile) {
      formData.append('avatarUrl', selectedFile); // Append avatar to FormData if a file is selected
    }

    updateUserMutation.mutate(
      { id: user.id, data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user', user.id] });

          toast({
            title: 'Profile updated.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onClose();
        },
        onError: () => {
          toast({
            title: 'Error updating profile.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        maxW={'606px'}
        rounded={15}
        bg="#1D1D1D"
        color="white"
      >
        <ModalHeader
          pl={4}
          pt={2}
          pb={0}
          fontSize={'20px'}
          fontWeight={700}
        >
          Edit Profile
        </ModalHeader>
        <ModalCloseButton color={'tweet.gray'}>
          <HiOutlineXCircle size={24} />
        </ModalCloseButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p={4}>
            <Box
              position={'relative'}
              marginBottom={12}
            >
              <Image
                src="/src/assets/icons/cover-profile.png"
                alt="thumbnail"
                height={'120px'}
                width={'100%'}
                rounded={8}
                objectFit="cover"
              />
              <Box
                position={'absolute'}
                bottom={'-35px'}
                left={'14px'}
              >
                <Box position={'relative'}>
                  <Input
                    id="avatarUrl"
                    type="file"
                    variant={'unstyled'}
                    border={'none'}
                    hidden
                    onChange={handleFileChange} // Handle file input
                  />
                  <Avatar
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : user.avatarUrl
                    }
                    name={user.name}
                    border={'solid 4px'}
                    height={'80px'}
                    width={'80px'}
                    rounded={'full'}
                    objectFit="cover"
                  />
                  <label htmlFor="avatarUrl">
                    <Box
                      position={'absolute'}
                      top={'25px'}
                      left={'23px'}
                      cursor={'pointer'}
                    >
                      <LuImagePlus size={'30px'} />
                    </Box>
                  </label>
                </Box>
              </Box>
            </Box>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                {...register('username')}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Textarea {...register('bio')} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              color={'white'}
              height={'41px'}
              justifyItems={'center'}
              backgroundColor={'tweet.green'}
              rounded={'full'}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Spinner size="sm" /> : 'Save'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
