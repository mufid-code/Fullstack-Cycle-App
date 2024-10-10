import {
  Card,
  Heading,
  Stack,
  Flex,
  Button,
  Image,
  Text,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import EditProfileModal from './item-edit-profile-modal';

import { useAppSelector } from '../../app/hooks/use-store';
import { useUserById } from '../../app/hooks/use-user';

// RightBarMyProfile Component
export function RightBarMyProfile() {
  // const { username, handle, coverPic, profilePic, bio, following, followers } =
  //   profileData;
  const userId = useAppSelector((state) => state.auth.user.id);
  const { data } = useUserById(userId);
  // const user = useAppSelector((state) => state.auth.user);

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI's modal hooks

  return (
    <>
      <Card
        bgColor="tweet.profiles"
        textColor="tweet.putih"
        px="24px"
        py="8px"
      >
        <Heading
          fontSize="20px"
          fontWeight="bold"
          py="8px"
        >
          My Profile
        </Heading>
        <Stack gap="12px">
          <Image
            src={
              data?.avatarUrl ||
              'https://res.cloudinary.com/dje40bx3b/image/upload/v1728323518/circle-image/vdlx9stb6q2vb1syhpb9.png'
            }
            position="relative"
            borderRadius="12px"
            h="100px"
            backgroundSize="cover"
          />
          <Avatar
            src={data?.avatarUrl}
            name={data?.name}
            position="absolute"
            mt="70px"
            ml="24px"
            borderRadius="full"
            border="2px"
            zIndex="8"
            boxSize="80px"
            backgroundSize="cover"
          />
          <Flex
            justifyContent="end"
            alignSelf="stretch"
          >
            <Button
              w="106px"
              variant="outline"
              onClick={onOpen}
            >
              <Text
                as={'span'}
                fontSize="14px"
                textColor="tweet.putih"
              >
                Edit Profile
              </Text>
            </Button>
          </Flex>
          <Stack gap="4px">
            <Text
              as={'span'}
              fontSize="24px"
            >
              {data?.name}
            </Text>
            <Text
              as={'span'}
              fontSize="14px"
              textColor="tweet.gray"
            >
              @{data?.username}
            </Text>
            <Text
              as={'span'}
              fontSize="16px"
            >
              {data?.bio}
            </Text>
            <Flex
              gap="4px"
              fontSize="16px"
            >
              <Text as={'span'}>{data?.following.length}</Text>
              <Text
                as={'span'}
                textColor="tweet.gray"
              >
                Followers
              </Text>
              <Text
                ml="12px"
                as={'span'}
              >
                {data?.followers.length}
              </Text>
              <Text
                as={'span'}
                textColor="tweet.gray"
              >
                Following
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Card>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
