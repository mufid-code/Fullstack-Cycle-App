import {
  Card,
  Heading,
  Stack,
  Flex,
  Button,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import EditProfileModal from './item-edit-profile-modal';
import { useUserById } from '../../app/hooks/use-user';

// const profileData = {
//   username: "✨ Stella Audhina ✨",
//   handle: "audhinafh",
//   coverPic: "src/assets/icons/cover-profile.png",
//   profilePic: " https://bit.ly/dan-abramov",
//   bio: "picked over by the worms, and weird fishes",
//   following: 291,
//   followers: 23,
// };

// RightBarMyProfile Component
export function RightBarMyProfile() {
  // const { username, handle, coverPic, profilePic, bio, following, followers } =
  //   profileData;
  const { data } = useUserById(Number(2));
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
            src={data?.avatarUrl}
            position="relative"
            borderRadius="12px"
            h="100px"
            backgroundSize="cover"
          />
          <Image
            src={data?.avatarUrl}
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
              <Text as={'span'}>{}</Text>
              <Text
                as={'span'}
                textColor="tweet.gray"
              >
                Following
              </Text>
              <Text
                ml="12px"
                as={'span'}
              >
                {}
              </Text>
              <Text
                as={'span'}
                textColor="tweet.gray"
              >
                Followers
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
